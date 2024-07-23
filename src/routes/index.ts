import express, { Router, Request, Response } from 'express';
import { authentication } from '../middleware/authenticateMiddleware';
import { generateQris, generateQrisPay } from '../controllers/qrController';
import { handleNotFound, handleError } from '../utils/responseHelper';

const router: Router = express.Router();

router.get('/qr/qr-generate', authentication, generateQris);
router.post('/qr/qr-pay', authentication, generateQrisPay);

router.use((req: Request, res: Response) => {
  handleNotFound(res, "Route not found")
});

router.use((error: unknown, req: Request, res: Response) => {
  handleError(res, "Something wrong", error)
});

export default router;