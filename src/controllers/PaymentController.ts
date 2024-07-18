import { Request, Response } from 'express';
import PaymentService from '../services/PaymentService';

class PaymentController {
  public generateQris = async (req: Request | any, res: Response) => {
    const user = req.user;
    const users = await PaymentService.getUserAccount(user.sub);

    return res.status(200).json({ message: 'Success', users });
  }
}

export default new PaymentController();