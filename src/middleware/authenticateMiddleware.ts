/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { verifyToken, verifyTokenPin } from '../utils/jwt';
import { handleUnauthorized, handleForbidden, handleBadRequest } from '../helpers/responseHelper';

export const authentication = (req: Request | any, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return handleUnauthorized(res, "User not have credentials");
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    return handleForbidden(res, "User not have access");
  }
}

export const validatePin = (req: Request | any, res: Response, next: NextFunction) => {
  const pinToken = req.headers['x-pin-token'];

  if (!pinToken) {
    return handleBadRequest(res, "X-PIN-TOKEN header is required");
  }

  try {
    verifyTokenPin(pinToken);

    next();
  } catch (err) {
    return handleForbidden(res, "Invalid PIN");
  }
}