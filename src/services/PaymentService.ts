import QRCode from "qrcode";
import { findByUsername } from "../repositories/userRepository";
import { UserAccount } from "../interfaces/User";
import { QrisPayPayload } from "../interfaces/QrisPayload";
import { qrisExpire } from "../utils/qrisExpire";

export const getUserAccount = async (username: string): Promise<UserAccount | null> => {
  const user = await findByUsername(username);

  if (!user) {
    return null;
  }

  const userAccount: UserAccount = {
    user: {
      name: user.name,
      username: user.username
    },
    account: {
      account_number: user.accounts.account_number
    }
  }

  return userAccount;
}

export const qrisPay = async (
  username: string, 
  amount: string, 
  mode: 'dark' | 'bright' = 'bright'
): Promise<{ qrImage: string, expiresAt: number } | null> => {
  const user = await findByUsername(username);

  if (!user) {
    return null;
  }

  // Set Expire date in second
  const expiresAt = qrisExpire(3000);

  const color = mode === 'dark'
  ? { dark: '#FFFFFF', light: '#1C1C1E' }
  : { dark: '#1C1C1E', light: '#FFFFFF' };
  
  const userAccount: QrisPayPayload = {
    beneficiary: {
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