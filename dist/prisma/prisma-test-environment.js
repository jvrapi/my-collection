"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const jest_environment_node_1 = __importDefault(require("jest-environment-node"));
const promise_1 = require("mysql2/promise");
const node_child_process_1 = require("node:child_process");
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
(0, dotenv_1.config)({ path: '.env.testing' });
const execSync = (0, node_util_1.promisify)(node_child_process_1.exec);
const prismaBinary = './node_modules/.bin/prisma';
class PrismaTestEnvironment extends jest_environment_node_1.default {
    constructor(config, context) {
        super(config, context);
        const dbUser = process.env.DATABASE_USER;
        const dbPass = process.env.DATABASE_PASS;
        const dbHost = process.env.DATABASE_HOST;
        const dbPort = process.env.DATABASE_PORT;
        const dbName = `test_${(0, node_crypto_1.randomBytes)(6).toString('hex')}`;
        this.databaseName = dbName;
        this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}`;
    }
    async setup() {
        process.env.DATABASE_URL = `${this.connectionString}/${this.databaseName}`;
        this.global.process.env.DATABASE_URL = `${this.connectionString}/${this.databaseName}`;
        const connection = await (0, promise_1.createConnection)(this.connectionString);
        await connection.connect();
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${this.databaseName}`);
        await connection.end();
        await execSync(`${prismaBinary} migrate deploy`);
        return super.setup();
    }
    async teardown() {
        const client = await (0, promise_1.createConnection)(`${this.connectionString}/${this.databaseName}`);
        await client.connect();
        await client.query(`DROP DATABASE IF EXISTS ${this.databaseName}`);
        await client.end();
    }
}
exports.default = PrismaTestEnvironment;
