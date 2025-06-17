// models/Note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
  summary: {
    type: String, // this is the Groq-generated notes
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model("Note", noteSchema);