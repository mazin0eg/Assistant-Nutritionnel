import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "public/uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Seules les images sont autorisées"), false);
};

export const uploadImage = multer({ storage, fileFilter });
