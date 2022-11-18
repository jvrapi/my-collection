import jestConfig from './jest.config';


export default {
  ...jestConfig,
  testRegex: '-unit.spec.ts$',
};