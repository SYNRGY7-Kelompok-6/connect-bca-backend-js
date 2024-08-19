import QRCode from "qrcode";
import { findByUserId } from "../repositories/userRepository";
import { QrisTransferPayload, QrisPayPayload, Amount } from "../interfaces/QrPayload";
import { uploadImage } from './uploadImageService';
import { encryptData,decryptData } from "../utils/qrisEncrypt";
import { qrisExpire, isExpired } from "../utils/qrisExpire";

export const qrisTransfer = async (
  userId: string, 
  mode: 'dark' | 'bright' = 'bright',
  option: 'qr' | 'url'
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
    beneficiaryName: user.name,
    beneficiaryAccountNumber: user.accounts.account_number,
    remark: 'QRIS Transfer',
    expiresAt
  }

  // Encrypt payload data
  const encryptedData = encryptData(userAccount);

  // Generate QR code
  let qrImage = await QRCode.toDataURL(encryptedData, { color });

  // Upload image if option to url
  if (option === 'url') {
    qrImage = await uploadImage(qrImage);
  }
  
  return { qrImage, expiresAt };
}

export const qrisPay = async (
  userId: string, 
  amount: Amount, 
  mode: 'dark' | 'bright' = 'bright',
  option: 'qr' | 'url'
): Promise<{ qrImage: string, expiresAt: number } | null> => {
  const user = await findByUserId(userId);
  const expiresAt = qrisExpire(300);

  if (!user) {
    return null;
  }

  const color = mode === 'dark'
  ? { dark: '#FFFFFF', light: '#1C1C1E' }
  : { dark: '#1C1C1E', light: '#FFFFFF' };
  
  const userAccount: QrisPayPayload = {
    sourceName: user.name,
    sourceAccountNumber: user.accounts.account_number,
    amount,
    remark: 'QRIS Pay',
    expiresAt
  }

  // Encrypt payload data
  const encryptedData = encryptData(userAccount);

  // Generate QR code
  let qrImage = await QRCode.toDataURL(encryptedData, { color });

  // Upload image if option to url
  if (option === 'url') {
    qrImage = await uploadImage(qrImage);
  }

  return { qrImage, expiresAt };
}

export const verifyQR = async (userId: string, qrData: string): Promise<QrisPayPayload | QrisTransferPayload | boolean | null> => {
  const decryptedData = await decryptData(qrData);

  if (isExpired(decryptedData.expiresAt)) {
    return false;
  }

  if (decryptedData.remark === 'QRIS Pay') {
    const user = await findByUserId(userId);
  
    if (!user) {
      return null;
    } else if (user.accounts.account_number === decryptedData.sourceAccountNumber) {
      return null;
    }

    const userAccount: QrisPayPayload = {
      sourceName: decryptedData.sourceName,
      sourceAccountNumber: decryptedData.sourceAccountNumber,  
      beneficiaryName: user.name,
      beneficiaryAccountNumber: user.accounts.account_number,
      amount: decryptedData.amount,
      remark: decryptedData.remark,
      expiresAt: decryptedData.expiresAt
    }
  
    return userAccount;
  }

  return decryptedData;
}