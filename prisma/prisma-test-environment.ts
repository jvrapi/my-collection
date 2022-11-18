import { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import {config} from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { createConnection } from 'mysql2/promise';
import { exec } from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {promisify} from 'node:util';

config({ path: '.env.testing' });

const execSync = promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private databaseName: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = `test_${randomBytes(6).toString('hex')}`; 
    this.databaseName = dbName;
    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}`;
  }

  async setup() {
    process.env.DATABASE_URL = `${this.connectionString}/${this.databaseName}`;
    this.global.process.env.DATABASE_URL = `${this.connectionString}/${this.databaseName}`;
    const connection = await createConnection(this.connectionString)
    await connection.connect()
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${this.databaseName}`)
    await connection.end()
    await execSync(`${prismaBinary} migrate deploy`);
    return super.setup();
  }

  async teardown() {
    const client = await createConnection(`${this.connectionString}/${this.databaseName}`)
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS ${this.databaseName}`);
    await client.end();
  }
}