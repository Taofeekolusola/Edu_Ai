require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection and Server Start
connectDB();

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//Notes Routes
const notesRoutes = require("./routes/notesRoutes");
app.use("/api/notes", notesRoutes);

//Uploads Routes
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Trascription Routes
const transcribeRoutes = require("./routes/transcribeRoutes");
app.use("/api/transcribe", transcribeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));