// backend/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseDetail,
  enrollCourse,
  getMyCourses,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  getFeaturedCourses,
  getCourseProgress,
  updateCourseProgress
} = require('../controllers/courseController');
const { protect, authorizeRoles, optionalAuth, checkEnrollment } = require('../middlewares/authMiddleware');

// @desc    Get all courses (with filtering)
// @route   GET /api/courses
// @access  Public
router.get('/', optionalAuth, getCourses);

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
router.get('/featured', getFeaturedCourses);

// @desc    Get single course details
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', optionalAuth, getCourseDetail);

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private (Student)
router.post('/:id/enroll', protect, authorizeRoles('Student'), enrollCourse);

// @desc    Get user's enrolled courses
// @route   GET /api/courses/user/my-courses
// @access  Private (Student)
router.get('/user/my-courses', protect, authorizeRoles('Student'), getMyCourses);

// @desc    Get course progress
// @route   GET /api/courses/:id/progress
// @access  Private (Student)
router.get('/:id/progress', protect, authorizeRoles('Student'), checkEnrollment, getCourseProgress);

// @desc    Update course progress
// @route   PUT /api/courses/:id/progress
// @access  Private (Student)
router.put('/:id/progress', protect, authorizeRoles('Student'), checkEnrollment, updateCourseProgress);

// Wishlist routes
// @desc    Get user's wishlist
// @route   GET /api/courses/wishlist/mine
// @access  Private
router.get('/wishlist/mine', protect, getWishlist);

// @desc    Add course to wishlist
// @route   POST /api/courses/wishlist/add
// @access  Private
router.post('/wishlist/add', protect, addToWishlist);

// @desc    Remove course from wishlist
// @route   DELETE /api/courses/wishlist/remove/:courseId
// @access  Private
router.delete('/wishlist/remove/:courseId', protect, removeFromWishlist);

module.exports = router;