// backend/routes/userRoutes.js (Corrected)
const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  getUserCourses,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getEnrollments
} = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// All routes are protected
router.use(protect);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', getProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', updateProfile);

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
router.put('/change-password', changePassword);

// @desc    Get user's enrolled courses
// @route   GET /api/users/my-courses
// @access  Private (Student)
router.get('/my-courses', authorizeRoles('Student'), getUserCourses);

// @desc    Get user's course enrollments
// @route   GET /api/users/enrollments
// @access  Private (Student)
router.get('/enrollments', authorizeRoles('Student'), getEnrollments);

// @desc    Get user's wishlist
// @route   GET /api/users/wishlist
// @access  Private
router.get('/wishlist', getWishlist);

// @desc    Add course to wishlist
// @route   POST /api/users/wishlist
// @access  Private
router.post('/wishlist', addToWishlist);

// @desc    Remove course from wishlist
// @route   DELETE /api/users/wishlist/:courseId
// @access  Private
router.delete('/wishlist/:courseId', removeFromWishlist);

module.exports = router;