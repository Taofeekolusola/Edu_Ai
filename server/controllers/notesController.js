// controllers/notesController.js
const fs = require("fs");
const axios = require("axios");
const groqClient = require("../utils/groqClient");
const Note = require("../models/Note");
require("dotenv").config();

const uploadAndGenerateNotes = async (req, res) => {
  try {
    const audioPath = req.file?.path;
    const userId = req.user?.id;

    if (!audioPath) {
      return res.status(400).json({ error: "Audio file is required" });
    }

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 1. Transcribe using Deepgram
    const audioBuffer = fs.readFileSync(audioPath);
    const deepgramResponse = await axios.post(
      "https://api.deepgram.com/v1/listen",
      audioBuffer,
      {
        headers: {
          "Authorization": `Token ${process.env.DEEPGRAM_API_KEY}`,
          "Content-Type": "audio/mp3",
        },
      }
    );
    const transcript = deepgramResponse.data.results.channels[0].alternatives[0].transcript;

    // 2. Generate notes with Groq
    const prompt = `
      You are an intelligent assistant. Summarize the following classroom lecture transcript.
      Extract:
      - Key points
      - Definitions
      - Questions students might ask

      Transcript:
      """${transcript}"""
    `;

    const groqResponse = await groqClient.post("/chat/completions", {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful note-taking assistant." },
        { role: "user", content: prompt },
      ],
    });

    const notes = groqResponse.data.choices[0].message.content;

    // 3. Save to DB
    const savedNote = await Note.create({
      userId,
      transcript,
      summary: notes,
    });

    res.status(201).json({
      message: "Note saved successfully",
      note: savedNote,
    });
  } catch (error) {
    console.error("Error saving note:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process and save note" });
  }
};

module.exports = { uploadAndGenerateNotes };
