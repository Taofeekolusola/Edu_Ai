// controllers/transcribeController.js
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const transcribeAudio = async (req, res) => {
  try {
    const audioPath = req.file?.path;

    if (!audioPath) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(audioPath));
    formData.append("model", "whisper-1");

    const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    res.json({
      transcript: response.data.text,
      message: "Transcription successful",
    });
  } catch (error) {
    console.error("Transcription error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
};

module.exports = { transcribeAudio };