// controllers/notesController.js
const fs = require("fs");
const groqClient = require("../utils/groqClient");

const generateNotes = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript text is required" });
    }

    const prompt = `
      You are an intelligent assistant. Summarize the following classroom lecture transcript.
      Extract:
      - Key points
      - Definitions
      - Questions students might ask

      Transcript:
      """${transcript}"""
    `;

    const response = await groqClient.post("/chat/completions", {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful note-taking assistant." },
        { role: "user", content: prompt },
      ],
    });

    const result = response.data.choices[0].message.content;
    res.json({ notes: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { generateNotes };