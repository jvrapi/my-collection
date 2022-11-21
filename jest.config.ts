
const swcConfig = {
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": true,
   
    },
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    },
  },
 
}

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  testTimeout: 30000,
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", swcConfig],
  },
  
};
