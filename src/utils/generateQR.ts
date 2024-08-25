import QRCode from "qrcode";
import Jimp from "jimp";
import path from "path";

export const generateQR = async (
  encryptedData: string, 
  color: { dark: string; light: string }
): Promise<string> => {
  const logoPath: string = path.join(__dirname, '../../public/assets/images/LogoConnect.png');
  const qrOptions = {
    color,
    width: 300,
    height: 300
  };

  let qrImage: string = await QRCode.toDataURL(encryptedData, qrOptions);

  const qrCodeImage = await Jimp.read(Buffer.from(qrImage.split(',')[1], 'base64'));
  const logo = await Jimp.read(logoPath);

  logo.resize(qrCodeImage.bitmap.width / 5, Jimp.AUTO);
  
  const x: number = (qrCodeImage.bitmap.width - logo.bitmap.width) / 2;
  const y: number = (qrCodeImage.bitmap.height - logo.bitmap.height) / 2;

  qrCodeImage.composite(logo, x, y);

  qrImage = await qrCodeImage.getBase64Async(Jimp.MIME_PNG);

  return qrImage;
}