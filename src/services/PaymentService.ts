import QRCode from "qrcode";
import { findByUserId } from "../repositories/userRepository";
import { QrisTransferPayload, QrisPayPayload } from "../interfaces/QrisPayload";
import { qrisExpire } from "../utils/qrisExpire";

export const qrisTransfer = async (
  userId: string, 
  amount: string, 
  mode: 'dark' | 'bright' = 'bright'
): Promise<{ qrImage: string, expiresAt: number } | null> => {
  const user = await findByUserId(userId);

  if (!user) {
    return null;
  }

  // Set Expire date in second
  const expiresAt = qrisExpire(3000);

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
    type: 'QRIS Pay',
    expiresAt
  }

  const qrImage = await QRCode.toDataURL(JSON.stringify(userAccount), { color });

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
    type: 'QRIS Transfer',
  }

  const qrImage = await QRCode.toDataURL(JSON.stringify(userAccount), { color });

  return { qrImage };
}