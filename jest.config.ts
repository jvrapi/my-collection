

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testTimeout: 30000,
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", {
      "jsc": {
        "parser": {
          "syntax": "typescript",
          "tsx": false,
          "decorators": true
        },
        "transform": {
          "legacyDecorator": true,
          "decoratorMetadata": true
        },
        "target": "es2020"
      },
      "module": {
        "type": "commonjs",
        "noInterop": true
      }
    }],
  },
  
};
