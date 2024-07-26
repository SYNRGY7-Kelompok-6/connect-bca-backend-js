"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_route_grouping_1 = __importDefault(require("express-route-grouping"));
const authenticateMiddleware_1 = require("../middleware/authenticateMiddleware");
const qrController_1 = require("../controllers/qrController");
const responseHelper_1 = require("../helpers/responseHelper");
const router = express_1.default.Router();
const root = new express_route_grouping_1.default('/', router);
root.group('qr', (qr) => {
    qr.post('/qr-transfer', authenticateMiddleware_1.authentication, qrController_1.generateQrisTransfer);
    qr.get('/qr-pay', authenticateMiddleware_1.authentication, qrController_1.generateQrisPay);
    qr.get('/qr-verify', authenticateMiddleware_1.authentication, qrController_1.verifyQris);
});
router.use((req, res) => {
    (0, responseHelper_1.handleNotFound)(res, "Route not found");
});
router.use((error, req, res) => {
    (0, responseHelper_1.handleError)(res, "Something wrong", error);
});
exports.default = router;
