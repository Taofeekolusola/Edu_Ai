// controllers/uploadController.js
const uploadAudio = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.status(200).json({
    message: "Audio uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
};

module.exports = { uploadAudio };