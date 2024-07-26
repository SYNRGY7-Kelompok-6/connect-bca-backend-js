import QRCode from "qrcode";
import { findByUserId } from "../repositories/userRepository";
import { QrisTransferPayload, QrisPayPayload, Amount } from "../interfaces/QrPayload";
import { encryptData,decryptData } from "../utils/qrisEncrypt";
import { qrisExpire, isExpired } from "../utils/qrisExpire";

export const qrisTransfer = async (
  userId: string, 
  amount: Amount, 
  mode: 'dark' | 'bright' = 'bright'
): Promise<{ qrImage: string, expiresAt: number } | null> => {
  const user = await findByUserId(userId);
  const expiresAt = qrisExpire(300);

  if (!user) {
    return null;
  }

  const color = mode === 'dark'
  ? { dark: '#FFFFFF', light: '#1C1C1E' }
  : { dark: '#1C1C1E', light: '#FFFFFF' };
  
  const userAccount: QrisTransferPayload = {
    recipient: {
      name: user.name,
      accountNumber: user.accounts.account_number
    },
    amount,
    type: 'QR Transfer',
    expiresAt
  }

  // Encrypt payload data
  const encryptedData = encryptData(userAccount);

  // Generate QR code
  const qrImage = await QRCode.toDataURL(encryptedData, { color });

  return { qrImage, expiresAt };
}

export const qrisPay = async (
  userId: string, 
  mode: 'dark' | 'bright' = 'bright'
): Promise<{ qrImage: string } | null> => {
  const user = await findByUserId(userId);

  if (!user) {
    return null;
  }

  const color = mode === 'dark'
  ? { dark: '#FFFFFF', light: '#1C1C1E' }
  : { dark: '#1C1C1E', light: '#FFFFFF' };
  
  const userAccount: QrisPayPayload = {
    recipient: {
      name: user.name,
      accountNumber: user.accounts.account_number
    },
    type: 'QR Pay',
  }

  // Encrypt payload data
  const encryptedData = encryptData(userAccount);

  // Generate QR code
  const qrImage = await QRCode.toDataURL(encryptedData, { color });

  return { qrImage };
}

export const verifyQR = async (qrData: string): Promise<QrisPayPayload | QrisTransferPayload | boolean> => {
  const decryptedData = await decryptData(qrData);

  if ('expiresAt' in decryptedData && isExpired(decryptedData.expiresAt)) {
    return false;
  }

  return decryptedData;
}
