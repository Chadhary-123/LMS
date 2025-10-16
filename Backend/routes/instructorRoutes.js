// backend/routes/instructorRoutes.js (Updated for Cloudinary)
const express = require('express');
const router = express.Router();
const {
  getInstructorDashboard,
  getInstructorCourses,
  getInstructorCourse,
  createCourse,
  updateCourse,
  publishCourse,
  unpublishCourse,
  deleteCourse,
  getCourseAnalytics,
  getCourseStudents,
  searchInstructorCourses
} = require('../controllers/instructorController');

// UPDATED: Import uploadController with new methods
const { 
  uploadVideo: uploadVideoHandler,
  uploadThumbnail, // NEW: Import thumbnail upload handler
  deleteVideo,
  getUploadStats 
} = require('../controllers/uploadController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { uploadVideo } = require('../utils/multerConfig'); // Multer middleware

// Apply protection and instructor authorization to all routes
router.use(protect);
router.use(authorizeRoles('Instructor'));

// @desc    Instructor dashboard
// @route   GET /api/instructor/dashboard
// @access  Private (Instructor)
router.get('/dashboard', getInstructorDashboard);

// @desc    Get instructor's courses
// @route   GET /api/instructor/courses
// @access  Private (Instructor)
router.get('/courses', getInstructorCourses);

// @desc    Search instructor courses
// @route   GET /api/instructor/courses/search
// @access  Private (Instructor)
router.get('/courses/search', searchInstructorCourses);

// @desc    Get single instructor course
// @route   GET /api/instructor/courses/:id
// @access  Private (Instructor)
router.get('/courses/:id', getInstructorCourse);

// @desc    Create a new course
// @route   POST /api/instructor/courses
// @access  Private (Instructor)
router.post('/courses', createCourse);

// @desc    Update a course
// @route   PUT /api/instructor/courses/:id
// @access  Private (Instructor)
router.put('/courses/:id', updateCourse);

// @desc    Publish a course
// @route   PATCH /api/instructor/courses/:id/publish
// @access  Private (Instructor)
router.patch('/courses/:id/publish', publishCourse);

// @desc    Unpublish a course
// @route   PATCH /api/instructor/courses/:id/unpublish
// @access  Private (Instructor)
router.patch('/courses/:id/unpublish', unpublishCourse);

// @desc    Delete a course
// @route   DELETE /api/instructor/courses/:id
// @access  Private (Instructor)
router.delete('/courses/:id', deleteCourse);

// @desc    Get course analytics
// @route   GET /api/instructor/courses/:id/analytics
// @access  Private (Instructor)
router.get('/courses/:id/analytics', getCourseAnalytics);

// @desc    Get course students
// @route   GET /api/instructor/courses/:id/students
// @access  Private (Instructor)
router.get('/courses/:id/students', getCourseStudents);

// UPDATED: UPLOAD ROUTES FOR CLOUDINARY
// @desc    Upload course video (promo video or lecture video) to Cloudinary
// @route   POST /api/instructor/upload/video
// @access  Private (Instructor)
router.post('/upload/video', uploadVideo.single('video'), uploadVideoHandler);

// @desc    Upload course thumbnail to Cloudinary
// @route   POST /api/instructor/upload/thumbnail
// @access  Private (Instructor)
router.post('/upload/thumbnail', uploadVideo.single('thumbnail'), uploadThumbnail);

// @desc    Delete uploaded video from Cloudinary
// @route   DELETE /api/instructor/upload/video/:publicId
// @access  Private (Instructor)
router.delete('/upload/video/:publicId', deleteVideo);

// @desc    Get upload statistics
// @route   GET /api/instructor/upload/stats
// @access  Private (Instructor)
router.get('/upload/stats', getUploadStats);

module.exports = router;