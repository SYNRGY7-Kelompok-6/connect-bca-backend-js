/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { qrisTransfer, qrisPay, verifyQR } from '../services/PaymentService';
import { 
  handleSuccess, 
  handleBadRequest,
  handleNotFound,  
  handleError, 
} from '../helpers/responseHelper';

export const generateQrisTransfer = async (req: Request | any, res: Response) => {
  const user = req.user;
  const { mode } = req.query;
  const { amount } = req.body;

  if (!amount) {
    return handleBadRequest(res, "Amount is required");
  }

  try {
    const qrData = await qrisTransfer(user.sub, amount, mode);

    if (!qrData) {
      return handleNotFound(res, "User not found");
    }

    return handleSuccess(res, "QR code generated successfully", qrData);
  } catch (error) {
    return handleError(res, "Error generating QR", error);
  }
}

export const generateQrisPay = async (req: Request | any, res: Response) => {
  const user = req.user;
  const { mode } = req.query;

  try {
    const qrData = await qrisPay(user.sub, mode);

    if (!qrData) {
      return handleNotFound(res, "User not found");
    }

    return handleSuccess(res, "QR code generated successfully", qrData);
  } catch (error) {
    return handleError(res, "Error generating QR", error);
  }
}

export const verifyQris = async (req: Request | any, res: Response) => {
  const { payload } = req.body;

  if (!payload) {
    return handleBadRequest(res, 'QR data payload is required')
  }

  try {
    const qrData = await verifyQR(payload);

    if (!qrData) {
      return handleBadRequest(res, 'QR code is expired')
    }

    return handleSuccess(res, "QR code payload succesfully parsed", qrData); 
  } catch (error) {
    return handleError(res, "Error parsed QR payload", error)
  }
}