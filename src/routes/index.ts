import express, { Router, Request, Response } from 'express';
import RouteGroup from 'express-route-grouping';
import { authentication } from '../middleware/authenticateMiddleware';
import { generateQris, generateQrisTransfer } from '../controllers/qrController';
import { handleNotFound, handleError } from '../helpers/responseHelper';

const router: Router = express.Router();
const root = new RouteGroup('/', router);

root.group('qr', (qr) => {
  qr.get('/qr-generate', authentication, generateQris);
  qr.post('/qr-transfer', authentication, generateQrisTransfer);
})

router.use((req: Request, res: Response) => {
  handleNotFound(res, "Route not found")
});

router.use((error: unknown, req: Request, res: Response) => {
  handleError(res, "Something wrong", error)
});

export default router;