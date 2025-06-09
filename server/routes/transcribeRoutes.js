const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { transcribeAudio } = require("../controllers/transcribeController");

router.post("/audio", upload.single("audio"), transcribeAudio);

module.exports = router;