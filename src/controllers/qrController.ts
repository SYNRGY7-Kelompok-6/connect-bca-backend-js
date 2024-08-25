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
  const user: any = req.user;
  const { mode, option }: { mode: any, option: any } = req.query;

  if (Object.keys(req.body).length > 0) {
    return handleBadRequest(res, 'This request not have body');
  }

  try {
    const qrData = await qrisTransfer(user.sub, mode, option);

    if (!qrData) {
      return handleNotFound(res, "User not found");
    }

    return handleSuccess(res, "QRIS generated successfully", qrData);
  } catch (error) {
    return handleError(res, "Error generating QRIS", error);
  }
}

export const generateQrisPay = async (req: Request | any, res: Response) => {
  const user: any = req.user;
  const { mode, option }: { mode: any, option: any } = req.query;
  const { amount }: { amount: any} = req.body;

  if (!amount.value) {
    return handleBadRequest(res, "Amount value is required");
  } else if (!amount.currency) {
    return handleBadRequest(res, "Amount currency is required");
  } else if (typeof amount.value !== "number") {
    return handleBadRequest(res, "Amount value invalid");
  } else if (amount.currency !== 'IDR') {
    return handleBadRequest(res, "Amount value should be IDR");
  } else if (amount.value <= 100) {
    return handleBadRequest(res, "Amount must be greater than 100");
  }

  try {
    const qrData = await qrisPay(user.sub, amount, mode, option);

    if (!qrData) {
      return handleNotFound(res, "User not found");
    }

    return handleSuccess(res, "QRIS generated successfully", qrData);
  } catch (error) {
    return handleError(res, "Error generating QRIS", error);
  }
}

export const verifyQris = async (req: Request | any, res: Response) => {
  const user: any = req.user;
  const { payload }: { payload: any } = req.body;

  if (!payload) {
    return handleBadRequest(res, 'QRIS data payload is required')
  }

  try {
    const qrData = await verifyQR(user.sub, payload);

    if (qrData === false) {
      return handleNotFound(res, 'QRIS is expired')
    } else if (qrData === null) {
      return handleNotFound(res, 'Beneficiary is not valid, use another account to scan barcode')
    }

    return handleSuccess(res, "QRIS payload succesfully parsed", qrData); 
  } catch (error) {
    return handleError(res, "Error parsed QRIS payload", error)
  }
}