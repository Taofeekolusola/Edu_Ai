// middleware/upload.js
const multer = require("multer");
const path = require("path");

// Set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  const allowedExts = [".mp3", ".wav", ".m4a"];
  const allowedMimes = ["audio/mpeg", "audio/wav", "audio/x-m4a", "audio/mp4", "audio/x-mpeg"];

  if (allowedExts.includes(extname) && allowedMimes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Only audio files are allowed"));
};

const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB max
  fileFilter,
});

module.exports = upload;