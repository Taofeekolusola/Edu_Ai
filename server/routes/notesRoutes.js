// routes/notesRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadAndGenerateNotes } = require("../controllers/notesController");
const { verifyToken } = require("../middleware/auth");

router.post("/upload-and-generate", verifyToken,  upload.single("audio"), uploadAndGenerateNotes);

module.exports = router;