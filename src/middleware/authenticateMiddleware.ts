import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { handleUnauthorized, handleForbidden } from '../helpers/responseHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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