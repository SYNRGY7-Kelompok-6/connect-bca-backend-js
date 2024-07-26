import QRCode from "qrcode";
import { findByUserId } from "../repositories/userRepository";
import { QrisTransferPayload, QrisPayPayload, Amount } from "../interfaces/QrPayload";
import { encryptData,decryptData } from "../utils/qrisEncrypt";
import { qrisExpire } from "../utils/qrisExpire";

export const qrisTransfer = async (
  userId: string, 
  amount: Amount, 
  mode: 'dark' | 'bright' = 'bright'
): Promise<{ qrImage: string, expiresAt: number } | null> => {
  const user = await findByUserId(userId);
  const expiresAt = qrisExpire(3000);

  if (!user) {
    return null;
  }

  const color = mode === 'dark'
  ? { dark: '#FFFFFF', light: '#1C1C1E' }
  : { dark: '#1C1C1E', light: '#FFFFFF' };
  
  const userAccount: QrisTransferPayload = {
    beneficiary: {
      userId: user.user_id,
      name: user.name,
      username: user.username,
      accountNumber: user.accounts.account_number
    },
    amount,
    type: 'QR Pay',
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
    beneficiary: {
      userId: user.user_id,
      name: user.name,
      username: user.username,
      accountNumber: user.accounts.account_number
    },
    type: 'QR Transfer',
  }

  // Encrypt payload data
  const encryptedData = encryptData(userAccount);

  // Generate QR code
  const qrImage = await QRCode.toDataURL(encryptedData, { color });

  return { qrImage };
}

export const verifyQR = async (qrData: string): Promise<QrisPayPayload | QrisTransferPayload> => {
  const decryptedData = await decryptData(qrData);

  return decryptedData;
}