import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (imageDataUrl: string): Promise<string> => {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(imageDataUrl, {
      folder: 'SYNRGY7/qr-code',
      use_filename: true, 
      unique_filename: true,
      resource_type: 'image',
    });

    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading QR code to Cloudinary');
  }
};