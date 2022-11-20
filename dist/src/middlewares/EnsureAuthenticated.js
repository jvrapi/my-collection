"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsureAuthenticated = void 0;
const Error_1 = require("../errors/Error");
const EnsureAuthenticated = ({ context }, next) => {
    const token = context.token?.replace('Bearer', '').trim();
    if (!token) {
        throw new Error_1.ApiError('unauthorized', 401);
    }
    return next();
};
exports.EnsureAuthenticated = EnsureAuthenticated;
