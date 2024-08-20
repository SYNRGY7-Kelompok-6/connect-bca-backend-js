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
exports.verifyQR = exports.qrisPay = exports.qrisTransfer = void 0;
const userRepository_1 = require("../repositories/userRepository");
const uploadImageService_1 = require("./uploadImageService");
const generateQR_1 = require("../utils/generateQR");
const encryptQR_1 = require("../utils/encryptQR");
const expireQR_1 = require("../utils/expireQR");
const qrisTransfer = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, mode = 'bright', option) {
    const user = yield (0, userRepository_1.findByUserId)(userId);
    const expiresAt = (0, expireQR_1.qrisExpire)(300);
    if (!user) {
        return null;
    }
    const color = mode === 'dark'
        ? { dark: '#FFFFFF', light: '#1C1C1E' }
        : { dark: '#1C1C1E', light: '#FFFFFF' };
    const userAccount = {
        beneficiaryName: user.name,
        beneficiaryAccountNumber: user.accounts.account_number,
        remark: 'QRIS Transfer',
        expiresAt
    };
    // Encrypt payload data
    const encryptedData = (0, encryptQR_1.encryptData)(userAccount);
    // Generate QR code
    let qrImage = yield (0, generateQR_1.generateQR)(encryptedData, color);
    // Upload image if option to url
    if (option === 'url') {
        qrImage = yield (0, uploadImageService_1.uploadImage)(qrImage);
    }
    return { qrImage, expiresAt };
});
exports.qrisTransfer = qrisTransfer;
const qrisPay = (userId_1, amount_1, ...args_1) => __awaiter(void 0, [userId_1, amount_1, ...args_1], void 0, function* (userId, amount, mode = 'bright', option) {
    const user = yield (0, userRepository_1.findByUserId)(userId);
    const expiresAt = (0, expireQR_1.qrisExpire)(300);
    if (!user) {
        return null;
    }
    const color = mode === 'dark'
        ? { dark: '#FFFFFF', light: '#1C1C1E' }
        : { dark: '#1C1C1E', light: '#FFFFFF' };
    const userAccount = {
        sourceName: user.name,
        sourceAccountNumber: user.accounts.account_number,
        amount,
        remark: 'QRIS Pay',
        expiresAt
    };
    // Encrypt payload data
    const encryptedData = (0, encryptQR_1.encryptData)(userAccount);
    // Generate QR code
    let qrImage = yield (0, generateQR_1.generateQR)(encryptedData, color);
    // Upload image if option to url
    if (option === 'url') {
        qrImage = yield (0, uploadImageService_1.uploadImage)(qrImage);
    }
    return { qrImage, expiresAt };
});
exports.qrisPay = qrisPay;
const verifyQR = (userId, qrData) => __awaiter(void 0, void 0, void 0, function* () {
    const decryptedData = yield (0, encryptQR_1.decryptData)(qrData);
    if ((0, expireQR_1.isExpired)(decryptedData.expiresAt)) {
        return false;
    }
    if (decryptedData.remark === 'QRIS Pay') {
        const user = yield (0, userRepository_1.findByUserId)(userId);
        if (!user) {
            return null;
        }
        else if (user.accounts.account_number === decryptedData.sourceAccountNumber) {
            return null;
        }
        const userAccount = {
            sourceName: decryptedData.sourceName,
            sourceAccountNumber: decryptedData.sourceAccountNumber,
            beneficiaryName: user.name,
            beneficiaryAccountNumber: user.accounts.account_number,
            amount: decryptedData.amount,
            remark: decryptedData.remark,
            expiresAt: decryptedData.expiresAt
        };
        return userAccount;
    }
    return decryptedData;
});
exports.verifyQR = verifyQR;
