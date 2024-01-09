import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import env from "./env.config";

/**
 * Configure Cloudinary with environment variables.
 */
cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Cloudinary upload parameters.
 */
const uploadParams = {
    folder: env.CLOUDINARY_FOLDER_NAME, // Specify the folder in which to store the uploaded images
    allowedFormats: ["jpeg", "png", "jpg"], // Specify allowed image formats
};

/**
 * Cloudinary storage configuration for multer.
 */
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: uploadParams,
});

export { cloudinary, cloudinaryStorage as storage };
