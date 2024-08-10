/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { verifyToken, verifyTokenPin } from '../utils/jwt';
import { findPinByUserId } from "../repositories/userRepository";
import { findPinByAccountNumber } from "../repositories/accountRepository";
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

export const validatePin = async (req: Request | any, res: Response, next: NextFunction) => {
  const user = req.user;
  const pinToken = req.headers['x-pin-token'];

  if (!pinToken) {
    return handleBadRequest(res, "X-PIN-TOKEN header is required");
  }

  try {
    const decoded: any = verifyTokenPin(pinToken);
    const userPin = await findPinByUserId(user.sub);
    const userPinX = await findPinByAccountNumber(decoded.sub);

    if (userPin?.pin === userPinX?.users.pin) {
      next();
    } else {
      return handleForbidden(res, "Invalid PIN");      
    }
  } catch (err) {
    return handleForbidden(res, "Invalid PIN");
  }
}