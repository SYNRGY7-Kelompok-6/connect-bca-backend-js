import { Response } from 'express';
import { qrisTransfer, qrisPay } from '../services/paymentService';
import { 
  handleUnauthorized,  
  handleSuccess, 
  handleError, 
  handleBadRequest
} from '../helpers/responseHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateQrisTransfer = async (req: Request | any, res: Response) => {
  const user = req.user;
  const { mode } = req.query;
  const { amount } = req.body;

  if (!user) {
    return handleUnauthorized(res, "User not have credentials");
  }

  if (!amount) {
    return handleBadRequest(res, "Amount is required");
  }

  try {
    const qrData = await qrisTransfer(user.sub, amount, mode);

    return handleSuccess(res, "QR code generated successfully", qrData);
  } catch (error) {
    return handleError(res, "Error generating QR", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateQrisPay = async (req: Request | any, res: Response) => {
  const user = req.user;
  const { mode } = req.query;

  if (!user) {
    return handleUnauthorized(res, "User not have credentials");
  }

  try {
    const qrData = await qrisPay(user.sub, mode);

    return handleSuccess(res, "QR code generated successfully", qrData);
  } catch (error) {
    return handleError(res, "Error generating QR", error);
  }
}