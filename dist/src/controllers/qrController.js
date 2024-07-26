"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQrisPay = exports.generateQrisTransfer = void 0;
const paymentService_1 = require("../services/paymentService");
const responseHelper_1 = require("../helpers/responseHelper");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateQrisTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { mode } = req.query;
    const { amount } = req.body;
    if (!user) {
        return (0, responseHelper_1.handleUnauthorized)(res, "User not have credentials");
    }
    if (!amount) {
        return (0, responseHelper_1.handleBadRequest)(res, "Amount is required");
    }
    try {
        const qrData = yield (0, paymentService_1.qrisTransfer)(user.sub, amount, mode);
        if (!qrData) {
            return (0, responseHelper_1.handleNotFound)(res, "User not found");
        }
        return (0, responseHelper_1.handleSuccess)(res, "QR code generated successfully", qrData);
    }
    catch (error) {
        return (0, responseHelper_1.handleError)(res, "Error generating QR", error);
    }
});
exports.generateQrisTransfer = generateQrisTransfer;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateQrisPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { mode } = req.query;
    if (!user) {
        return (0, responseHelper_1.handleUnauthorized)(res, "User not have credentials");
    }
    try {
        const qrData = yield (0, paymentService_1.qrisPay)(user.sub, mode);
        if (!qrData) {
            return (0, responseHelper_1.handleNotFound)(res, "User not found");
        }
        return (0, responseHelper_1.handleSuccess)(res, "QR code generated successfully", qrData);
    }
    catch (error) {
        return (0, responseHelper_1.handleError)(res, "Error generating QR", error);
    }
});
exports.generateQrisPay = generateQrisPay;
