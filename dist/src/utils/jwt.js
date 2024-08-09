"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenPin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => {
    const jwtSecretToken = process.env.JWT_SECRET_TOKEN || 'secret-token';
    const options = {};
    return jsonwebtoken_1.default.verify(token, jwtSecretToken, options);
};
exports.verifyToken = verifyToken;
const verifyTokenPin = (token) => {
    const jwtSecretToken = process.env.JWT_TRANSACTION_SECRET_TOKEN || 'secret-token';
    const options = {};
    return jsonwebtoken_1.default.verify(token, jwtSecretToken, options);
};
exports.verifyTokenPin = verifyTokenPin;
