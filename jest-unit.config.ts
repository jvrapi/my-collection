import { config } from 'dotenv';
import jestConfig from './jest.config';

config({path: './.env.testing'})


export default {
  ...jestConfig,
  testRegex: '-unit.spec.ts$',
  coverageDirectory: "./coverage/unit",
};