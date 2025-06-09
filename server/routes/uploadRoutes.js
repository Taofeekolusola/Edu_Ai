const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadAudio } = require("../controllers/uploadController");

router.post("/audio", upload.single("audio"), uploadAudio);

module.exports = router;