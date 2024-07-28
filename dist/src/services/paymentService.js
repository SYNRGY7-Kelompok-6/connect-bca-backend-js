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
exports.verifyQR = exports.qrisPay = exports.qrisTransfer = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const userRepository_1 = require("../repositories/userRepository");
const uploadImageService_1 = require("./uploadImageService");
const qrisEncrypt_1 = require("../utils/qrisEncrypt");
const qrisExpire_1 = require("../utils/qrisExpire");
const qrisTransfer = (userId_1, amount_1, ...args_1) => __awaiter(void 0, [userId_1, amount_1, ...args_1], void 0, function* (userId, amount, mode = 'bright', option) {
    const user = yield (0, userRepository_1.findByUserId)(userId);
    const expiresAt = (0, qrisExpire_1.qrisExpire)(300);
    if (!user) {
        return null;
    }
    const color = mode === 'dark'
        ? { dark: '#FFFFFF', light: '#1C1C1E' }
        : { dark: '#1C1C1E', light: '#FFFFFF' };
    const userAccount = {
        beneficiaryName: user.name,
        beneficiaryAccountNumber: user.accounts.account_number,
        amount,
        type: 'QR Transfer',
        expiresAt
    };
    // Encrypt payload data
    const encryptedData = (0, qrisEncrypt_1.encryptData)(userAccount);
    // Generate QR code
    let qrImage = yield qrcode_1.default.toDataURL(encryptedData, { color });
    // Upload image if option to url
    if (option === 'url') {
        qrImage = yield (0, uploadImageService_1.uploadImage)(qrImage);
    }
    return { qrImage, expiresAt };
});
exports.qrisTransfer = qrisTransfer;
const qrisPay = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, mode = 'bright', option) {
    const user = yield (0, userRepository_1.findByUserId)(userId);
    if (!user) {
        return null;
    }
    const color = mode === 'dark'
        ? { dark: '#FFFFFF', light: '#1C1C1E' }
        : { dark: '#1C1C1E', light: '#FFFFFF' };
    const userAccount = {
        beneficiaryName: user.name,
        beneficiaryAccountNumber: user.accounts.account_number,
        type: 'QR Pay',
    };
    // Encrypt payload data
    const encryptedData = (0, qrisEncrypt_1.encryptData)(userAccount);
    // Generate QR code
    let qrImage = yield qrcode_1.default.toDataURL(encryptedData, { color });
    // Upload image if option to url
    if (option === 'url') {
        qrImage = yield (0, uploadImageService_1.uploadImage)(qrImage);
    }
    return { qrImage };
});
exports.qrisPay = qrisPay;
const verifyQR = (qrData) => __awaiter(void 0, void 0, void 0, function* () {
    const decryptedData = yield (0, qrisEncrypt_1.decryptData)(qrData);
    if ('expiresAt' in decryptedData && (0, qrisExpire_1.isExpired)(decryptedData.expiresAt)) {
        return false;
    }
    return decryptedData;
});
exports.verifyQR = verifyQR;
