// utils/groqClient.js
const axios = require("axios");
require("dotenv").config();

const groqClient = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

module.exports = groqClient;