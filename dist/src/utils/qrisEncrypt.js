"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = exports.encryptData = void 0;
const crypto_1 = __importDefault(require("crypto"));
const encryptionKey = Buffer.from('7f5e2d6c3b2a6e1f4c8d2b3e5a6f9d0c7e8b1c2d4a5e6f7d8c9b0a1e2f3c4d5e', 'hex');
const iv = crypto_1.default.randomBytes(16);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const encryptData = (payload) => {
    const payloadString = typeof payload === 'object' ? JSON.stringify(payload) : payload;
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encrypted = cipher.update(payloadString, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};
exports.encryptData = encryptData;
const decryptData = (encryptedData) => {
    const [ivHex, encrypted] = encryptedData.split(':');
    if (!ivHex || !encrypted) {
        throw new Error('Invalid encrypted data format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
};
exports.decryptData = decryptData;
