import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from '../types/Cloudinary'
import dotenv from 'dotenv';

dotenv.config();

const { 
  CLOUD_NAME, 
  API_KEY, 
  API_SECRET 
} = process.env as Required<CloudinaryConfig>;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error('Cloudinary configuration is incomplete');
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export default cloudinary;