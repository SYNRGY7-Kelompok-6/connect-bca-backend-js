import { Response } from 'express';
import { getUserAccount } from '../services/PaymentService';
import QRCode from 'qrcode';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateQris = async (req: Request | any, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userAccount = await getUserAccount(user.sub);

  if (!userAccount) {
    return res.status(404).json({ message: 'User not found' });
  }  

  const url = await QRCode.toDataURL(JSON.stringify(userAccount));

  return res.status(200).json({ message: 'Success', data: url });
}