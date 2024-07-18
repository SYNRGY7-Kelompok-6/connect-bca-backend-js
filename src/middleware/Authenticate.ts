import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

class Authenticate {
  public authentication = (req: Request | any, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unautorized'})
    }

    try {
      const decoded = verifyToken(token)
      req.user = decoded;

      next()
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden' })
    }
  }
}

export default new Authenticate();