import crypto, { Cipher, Decipher } from 'crypto';
import dotenv from 'dotenv';
import { QrisTransferPayload, QrisPayPayload } from "../types/QrPayload";

dotenv.config();

const encryptionKeyEnv: string = process.env.ENCRYPTION_KEY || '7f5e2d6c3b2a6e1f4c8d2b3e5a6f9d0c7e8b1c2d4a5e6f7d8c9b0a1e2f3c4d5e';
const encryptionKey: Buffer = Buffer.from(encryptionKeyEnv, 'hex');
const iv: Buffer = crypto.randomBytes(16);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptData = (payload: QrisTransferPayload | QrisPayPayload) => {
  const payloadString: string = typeof payload === 'object' ? JSON.stringify(payload) : payload;
  const cipher: Cipher  = crypto.createCipheriv('aes-256-cbc' , encryptionKey, iv);
  let encrypted: string = cipher.update(payloadString, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

export const decryptData = (encryptedData: string): Promise<QrisTransferPayload | QrisPayPayload> => {
  const [ivHex, encrypted] = encryptedData.split(':');
  if (!ivHex || !encrypted) {
    throw new Error('Invalid encrypted data format');
  }

  const iv: Buffer = Buffer.from(ivHex, 'hex');
  const decipher: Decipher = crypto.createDecipheriv('aes-256-cbc' , encryptionKey, iv);
  let decrypted: string = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
}