"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePin = exports.authentication = void 0;
const jwt_1 = require("../utils/jwt");
const userRepository_1 = require("../repositories/userRepository");
const accountRepository_1 = require("../repositories/accountRepository");
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
const validatePin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const pinToken = req.headers['x-pin-token'];
    if (!pinToken) {
        return (0, responseHelper_1.handleBadRequest)(res, "X-PIN-TOKEN header is required");
    }
    try {
        const decoded = (0, jwt_1.verifyTokenPin)(pinToken);
        const userPin = yield (0, userRepository_1.findPinByUserId)(user.sub);
        const userPinX = yield (0, accountRepository_1.findPinByAccountNumber)(decoded.sub);
        if ((userPin === null || userPin === void 0 ? void 0 : userPin.pin) === (userPinX === null || userPinX === void 0 ? void 0 : userPinX.users.pin)) {
            next();
        }
        else {
            return (0, responseHelper_1.handleForbidden)(res, "Invalid PIN");
        }
    }
    catch (err) {
        return (0, responseHelper_1.handleForbidden)(res, "Invalid PIN");
    }
});
exports.validatePin = validatePin;
