import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CourseCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourseThunk, addToWishlistThunk } from '../redux/thunks/courseThunks';
import { selectWishlist } from '../redux/slices/courseSlice';

function CourseCard({ course }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const isWishlisted = wishlist.some(c => c._id === course._id);

  const handleEnroll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(enrollCourseThunk(course._id)).unwrap();
      alert('Successfully enrolled in course!');
    } catch (error) {
      alert(error || 'Failed to enroll');
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(addToWishlistThunk(course._id)).unwrap();
    } catch (error) {
      alert(error || 'Failed to update wishlist');
    }
  };

  const getThumbnailUrl = () => {
    if (!course.thumbnail) {
      return 'https://via.placeholder.com/300x180/5624d0/ffffff?text=Course+Thumbnail';
    }
    if (typeof course.thumbnail === 'string') return course.thumbnail;
    return course.thumbnail.url || 'https://via.placeholder.com/300x180/5624d0/ffffff?text=Course+Thumbnail';
  };

  const getInstructorName = () => {
    if (!course.instructor) return 'Unknown Instructor';
    if (typeof course.instructor === 'object' && course.instructor.name) return course.instructor.name;
    if (typeof course.instructor === 'string') return course.instructor;
    return 'Loading...';
  };

  return (
    <div className="course-card">
      <Link to={`/dashboard/courses/${course._id}`} className="course-link">
        <div className="course-image">
          <img 
            src={getThumbnailUrl()} 
            alt={course.title}
            onError={(e) => { 
              e.target.src = 'https://via.placeholder.com/300x180/5624d0/ffffff?text=Course+Thumbnail'; 
            }}
          />
          {course.bestseller && <span className="course-badge">Bestseller</span>}
        </div>
        
        <div className="course-content">
          <h3 className="course-title">{course.title}</h3>
          <p className="course-instructor">By {getInstructorName()}</p>
        </div>
      </Link>
      
      <div className="course-actions">
        <button className="enroll-btn" onClick={handleEnroll}>
          Enroll Now
        </button>
        <button 
          className={`course-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`} 
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}

export default CourseCard;