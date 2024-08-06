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
exports.verifyQris = exports.generateQrisPay = exports.generateQrisTransfer = void 0;
const paymentService_1 = require("../services/paymentService");
const responseHelper_1 = require("../helpers/responseHelper");
const generateQrisTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { mode, option } = req.query;
    const { amount } = req.body;
    if (!amount.value) {
        return (0, responseHelper_1.handleBadRequest)(res, "Amount value is required");
    }
    else if (!amount.currency) {
        return (0, responseHelper_1.handleBadRequest)(res, "Amount currency is required");
    }
    else if (typeof amount.value !== "number") {
        return (0, responseHelper_1.handleBadRequest)(res, "Amount value invalid");
    }
    else if (amount.currency !== 'IDR') {
        return (0, responseHelper_1.handleBadRequest)(res, "Amount value should be IDR");
    }
    else if (amount.value <= 100) {
        return (0, responseHelper_1.handleBadRequest)(res, "Amount must be greater than 100");
    }
    try {
        const qrData = yield (0, paymentService_1.qrisTransfer)(user.sub, amount, mode, option);
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
const generateQrisPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { mode, option } = req.query;
    try {
        const qrData = yield (0, paymentService_1.qrisPay)(user.sub, mode, option);
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
const verifyQris = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = req.body;
    if (!payload) {
        return (0, responseHelper_1.handleBadRequest)(res, 'QR data payload is required');
    }
    try {
        const qrData = yield (0, paymentService_1.verifyQR)(payload);
        if (!qrData) {
            return (0, responseHelper_1.handleNotFound)(res, 'QR code is expired');
        }
        return (0, responseHelper_1.handleSuccess)(res, "QR code payload succesfully parsed", qrData);
    }
    catch (error) {
        return (0, responseHelper_1.handleError)(res, "Error parsed QR payload", error);
    }
});
exports.verifyQris = verifyQris;
