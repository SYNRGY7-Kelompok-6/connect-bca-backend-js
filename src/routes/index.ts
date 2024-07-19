import express, { Router, Request, Response } from 'express';
import { authentication } from '../middleware/authenticateMiddleware';
import { generateQris } from '../controllers/PaymentController';

const router: Router = express.Router();

router.get('/payment/qr-generate', authentication, generateQris);

router.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route Not Found' })
})

export default router;