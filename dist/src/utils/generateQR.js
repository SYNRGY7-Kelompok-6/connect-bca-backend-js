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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQR = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const jimp_1 = __importDefault(require("jimp"));
const path_1 = __importDefault(require("path"));
const generateQR = (encryptedData, color) => __awaiter(void 0, void 0, void 0, function* () {
    const logoPath = path_1.default.join(__dirname, '../../public/assets/images/LogoConnect.png');
    const qrOptions = {
        color,
        width: 300,
        height: 300
    };
    let qrImage = yield qrcode_1.default.toDataURL(encryptedData, qrOptions);
    const qrCodeImage = yield jimp_1.default.read(Buffer.from(qrImage.split(',')[1], 'base64'));
    const logo = yield jimp_1.default.read(logoPath);
    logo.resize(qrCodeImage.bitmap.width / 6, jimp_1.default.AUTO);
    const x = (qrCodeImage.bitmap.width - logo.bitmap.width) / 2;
    const y = (qrCodeImage.bitmap.height - logo.bitmap.height) / 2;
    qrCodeImage.composite(logo, x, y);
    qrImage = yield qrCodeImage.getBase64Async(jimp_1.default.MIME_PNG);
    return qrImage;
});
exports.generateQR = generateQR;
