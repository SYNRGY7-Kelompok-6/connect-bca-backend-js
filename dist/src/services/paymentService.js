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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrisPay = exports.qrisTransfer = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const userRepository_1 = require("../repositories/userRepository");
const qrisExpire_1 = require("../utils/qrisExpire");
const qrisTransfer = (username_1, amount_1, ...args_1) => __awaiter(void 0, [username_1, amount_1, ...args_1], void 0, function* (username, amount, mode = 'bright') {
    const user = yield (0, userRepository_1.findByUsername)(username);
    if (!user) {
        return null;
    }
    // Set Expire date in second
    const expiresAt = (0, qrisExpire_1.qrisExpire)(3000);
    const color = mode === 'dark'
        ? { dark: '#FFFFFF', light: '#1C1C1E' }
        : { dark: '#1C1C1E', light: '#FFFFFF' };
    const userAccount = {
        beneficiary: {
            name: user.name,
            username: user.username,
            accountNumber: user.accounts.account_number
        },
        amount,
        type: 'QRIS Pay',
        expiresAt
    };
    const qrImage = yield qrcode_1.default.toDataURL(JSON.stringify(userAccount), { color });
    return { qrImage, expiresAt };
});
exports.qrisTransfer = qrisTransfer;
const qrisPay = (username_1, ...args_1) => __awaiter(void 0, [username_1, ...args_1], void 0, function* (username, mode = 'bright') {
    const user = yield (0, userRepository_1.findByUsername)(username);
    if (!user) {
        return null;
    }
    const color = mode === 'dark'
        ? { dark: '#FFFFFF', light: '#1C1C1E' }
        : { dark: '#1C1C1E', light: '#FFFFFF' };
    const userAccount = {
        beneficiary: {
            name: user.name,
            username: user.username,
            accountNumber: user.accounts.account_number
        },
        type: 'QRIS Transfer',
    };
    const qrImage = yield qrcode_1.default.toDataURL(JSON.stringify(userAccount), { color });
    return { qrImage };
});
exports.qrisPay = qrisPay;
