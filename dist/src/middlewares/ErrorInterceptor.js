"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const ErrorInterceptor = (error) => {
    return {
        message: error.message,
        extensions: {
            status: error.extensions.code,
        }
    };
};
exports.ErrorInterceptor = ErrorInterceptor;
