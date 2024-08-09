"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePin = exports.authentication = void 0;
const jwt_1 = require("../utils/jwt");
const responseHelper_1 = require("../helpers/responseHelper");
const authentication = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return (0, responseHelper_1.handleUnauthorized)(res, "User not have credentials");
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        return (0, responseHelper_1.handleForbidden)(res, "User not have access");
    }
};
exports.authentication = authentication;
const validatePin = (req, res, next) => {
    const pinToken = req.headers['x-pin-token'];
    if (!pinToken) {
        return (0, responseHelper_1.handleBadRequest)(res, "X-PIN-TOKEN header is required");
    }
    try {
        (0, jwt_1.verifyTokenPin)(pinToken);
        next();
    }
    catch (err) {
        return (0, responseHelper_1.handleForbidden)(res, "Invalid PIN");
    }
};
exports.validatePin = validatePin;
