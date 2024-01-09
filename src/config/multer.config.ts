import { Request } from "express";
import multer from "multer";
import { storage } from "./cloudinary.config";

/**
 * Allowed MIME types for uploaded images.
 */
const allowedMimeTypes: string[] = ["image/png", "image/jpg", "image/jpeg"];

/**
 * Multer options for file upload configuration.
 */
const multerOptions: multer.Options = {
    storage,
    fileFilter: (_req: Request, file: Express.Multer.File, cb) => {
        if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error("Only .png, .jpg, .jpeg formats are allowed!");
            err.name = "ExtensionError";
            return cb(err);
        }
    },
};

/**
 * Multer middleware for handling file uploads.
 * @example
 * ```typescript
 * import { upload } from "./upload.config";
 *
 * // Use upload middleware in your Express route
 * app.post("/upload", upload.single("image"), (req, res) => {
 *     // Handle file upload logic here
 * });
 * ```
 */
const upload = multer(multerOptions);

export { upload };
