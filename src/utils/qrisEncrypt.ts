import crypto from 'crypto';
import { QrisTransferPayload, QrisPayPayload } from "../interfaces/QrisPayload";

const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const encryptData = (payload: QrisTransferPayload | QrisPayPayload): string => {
  const payloadString = typeof payload === 'object' ? JSON.stringify(payload) : payload;
  const cipher  = crypto.createCipheriv('aes-256-cbc' , encryptionKey, iv);
  let encrypted = cipher.update(payloadString, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

export const decryptData = (encryptData: string): QrisTransferPayload | QrisPayPayload => {
  const decipher  = crypto.createDecipheriv('aes-256-cbc' , encryptionKey, iv);
  let decrypted = decipher.update(encryptData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
}