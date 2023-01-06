import jestConfig from './jest.config';
import './src/tests/mocks/nock';

export default {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testRegex: '-e2e.spec.ts$',
  coverageDirectory: './coverage/e2e',
};
