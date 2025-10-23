// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const path = require("path");
const connectDB = require("./config/db");
const initSocket = require("./config/socket"); // ✅ NEW IMPORT

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.REACT_FRONT,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));
app.use('/uploads/thumbnails', express.static(path.join(__dirname, 'uploads/thumbnails')));

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const videoRoutes = require("./routes/videoRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Health route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running with video upload support",
    timestamp: new Date().toISOString(),
  });
});

// Connect DB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.IO (moved to its own file)
const io = initSocket(server);
app.set("io", io);

// Start server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🎯 Video upload + Socket.IO support enabled`);
});
