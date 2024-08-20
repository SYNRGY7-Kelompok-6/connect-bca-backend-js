import express, { Router, Request, Response } from 'express';
import RouteGroup from 'express-route-grouping';
import { authentication, validatePin } from '../middleware/authenticateMiddleware';
import { generateQrisTransfer, generateQrisPay, verifyQris } from '../controllers/qrController';
import { handleNotFound, handleError } from '../helpers/responseHelper';

const router: Router = express.Router();
const root: RouteGroup = new RouteGroup('/', router);

root.group('qr', (qr) => {
  qr.get('/qr-transfer', authentication, generateQrisTransfer);
  qr.post('/qr-pay', authentication, validatePin, generateQrisPay);
  qr.post('/qr-verify', authentication, verifyQris);
})

router.use((req: Request, res: Response) => {
  handleNotFound(res, "Route not found")
});

router.use((error: unknown, req: Request, res: Response) => {
  handleError(res, "Something wrong", error)
});

export default router;