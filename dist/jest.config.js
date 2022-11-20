"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
};
exports.default = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testTimeout: 30000,
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", swcConfig],
    },
};
