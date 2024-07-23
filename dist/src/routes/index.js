"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateMiddleware_1 = require("../middleware/authenticateMiddleware");
const qrController_1 = require("../controllers/qrController");
const responseHelper_1 = require("../utils/responseHelper");
const router = express_1.default.Router();
router.get('/qr/qr-generate', authenticateMiddleware_1.authentication, qrController_1.generateQris);
router.get('/qr/qr-pay', authenticateMiddleware_1.authentication, qrController_1.generateQrisPay);
router.use((req, res) => {
    (0, responseHelper_1.handleNotFound)(res, "Route not found");
});
router.use((error, req, res) => {
    (0, responseHelper_1.handleError)(res, "Something wrong", error);
});
exports.default = router;
