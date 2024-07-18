import express, { Router, Request, Response } from 'express';
import Authenticate from '../middleware/Authenticate';
import PaymentController from '../controllers/PaymentController';

const router: Router = express.Router();

router.get('/payment/generate-qris', Authenticate.authentication, PaymentController.generateQris);

router.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route Not Found' })
})

export default router;