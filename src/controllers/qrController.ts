/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { qrisTransfer, qrisPay, verifyQR } from '../services/paymentService';
import { 
  handleSuccess, 
  handleBadRequest,
  handleNotFound,  
  handleError, 
} from '../helpers/responseHelper';

export const generateQrisTransfer = async (req: Request | any, res: Response) => {
  const user = req.user;
  const { mode, option } = req.query;
  const { amount } = req.body;

  if (!amount.value) {
    return handleBadRequest(res, "Amount value is required");
  } else if (!amount.currency) {
    return handleBadRequest(res, "Amount currency is required");
  }

  try {
    const qrData = await qrisTransfer(user.sub, amount, mode, option);

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
  const { mode, option } = req.query;

  try {
    const qrData = await qrisPay(user.sub, mode, option);

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