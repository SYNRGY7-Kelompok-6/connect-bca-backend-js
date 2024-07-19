import { Response } from 'express';
import QRCode from 'qrcode';
import { getUserAccount } from '../services/paymentService';
import { 
  handleUnauthorized, 
  handleNotFound, 
  handleSuccess, 
  handleError 
} from '../utils/responseHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateQris = async (req: Request | any, res: Response) => {
  const user = req.user;

  if (!user) {
    return handleUnauthorized(res, "User not have credentials");
  }

  try {
    const userAccount = await getUserAccount(user.sub);

    if (!userAccount) {
      return handleNotFound(res, "User not found");
    }        

    const url = await QRCode.toDataURL(JSON.stringify(userAccount));

    return handleSuccess(res, "QR code generated successfully", { qrImage: url });
  } catch (error) {
    return handleError(res, "Error generating QR", error);
  }
}