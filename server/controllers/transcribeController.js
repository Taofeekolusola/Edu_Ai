// controllers/transcribeController.js
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const transcribeAudio = async (req, res) => {
  try {
    const audioPath = req.file?.path;

    if (!audioPath) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const audioBuffer = fs.readFileSync(audioPath);

    const response = await axios.post(
      "https://api.deepgram.com/v1/listen",
      audioBuffer,
      {
        headers: {
          "Authorization": `Token ${process.env.DEEPGRAM_API_KEY}`,
          "Content-Type": "audio/mp3", // Or audio/wav, depending on your file
        },
      }
    );

    const transcript = response.data.results.channels[0].alternatives[0].transcript;

    res.json({
      transcript,
      message: "Transcription successful",
    });
  } catch (error) {
    console.error("Transcription error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
};

module.exports = { transcribeAudio };