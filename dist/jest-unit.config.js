"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_config_1 = __importDefault(require("./jest.config"));
exports.default = {
    ...jest_config_1.default,
    testRegex: '-unit.spec.ts$',
};
