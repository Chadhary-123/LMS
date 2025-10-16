// backend/server.js (Updated with Video Upload Support)
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const connectDB = require("./config/db");

// Load env
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",  // frontend URL
    credentials: true,                // allow cookies/auth headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NEW: Serve static files for uploaded videos and thumbnails
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos'), {
  setHeaders: (res, filePath) => {
    // Set proper headers for video files
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    } else if (filePath.endsWith('.webm')) {
      res.setHeader('Content-Type', 'video/webm');
    } else if (filePath.endsWith('.ogg')) {
      res.setHeader('Content-Type', 'video/ogg');
    }
    
    // Enable range requests for video streaming
    res.setHeader('Accept-Ranges', 'bytes');
  }
}));

app.use('/uploads/thumbnails', express.static(path.join(__dirname, 'uploads/thumbnails'), {
  setHeaders: (res, filePath) => {
    // Set cache control for thumbnails (cache for 1 day)
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
}));

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

const videoRoutes = require("./routes/videoRoutes"); // NEW: Video routes

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/instructor", instructorRoutes);

app.use("/api/videos", videoRoutes); // NEW: Video streaming routes
// Add this to your server.js routes section
const enrollmentRoutes = require('./routes/enrollmentRoutes');
app.use('/api/enrollments', enrollmentRoutes);
// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running with video upload support",
    timestamp: new Date().toISOString(),
    uploads: {
      videos: "/uploads/videos",
      thumbnails: "/uploads/thumbnails"
    }
  });
});

// Connect DB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // Course creation notifications
  socket.on("courseCreated", (data) => {
    console.log("🎓 New course created:", data.courseTitle);
    io.emit("newCourseNotification", {
      type: "course_created",
      message: `New course: ${data.courseTitle}`,
      courseId: data.courseId,
      instructor: data.instructorName,
      timestamp: new Date()
    });
  });

  // Video upload notifications
  socket.on("videoUploadProgress", (data) => {
    console.log("📹 Video upload progress:", data);
    // Emit to specific user (instructor) about upload progress
    socket.emit("uploadProgress", data);
  });

  // General notifications
  socket.on("sendNotification", (data) => {
    console.log("📩 Notification received:", data);
    io.emit("receiveNotification", data);
  });

  // User joins specific room (e.g., for course updates)
  socket.on("joinCourseRoom", (courseId) => {
    socket.join(`course_${courseId}`);
    console.log(`User ${socket.id} joined course room: ${courseId}`);
  });

  // User leaves course room
  socket.on("leaveCourseRoom", (courseId) => {
    socket.leave(`course_${courseId}`);
    console.log(`User ${socket.id} left course room: ${courseId}`);
  });


  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Make io accessible to routes if needed
app.set('io', io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Upload directories ready:`);
  console.log(`   - Videos: ${path.join(__dirname, 'uploads/videos')}`);
  console.log(`   - Thumbnails: ${path.join(__dirname, 'uploads/thumbnails')}`);
  console.log(`🎯 Video upload support enabled`);
});
