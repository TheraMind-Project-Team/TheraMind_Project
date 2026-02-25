import React, { useState } from 'react';
import './Rating.css';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedRecommendation, setSelectedRecommendation] = useState('');
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');

  const qualityOptions = [
    'Excellent - Exceeded expectations',
    'Good - Met expectations',
    'Average - Satisfactory',
    'Poor - Below expectations'
  ];

  const recommendationOptions = [
    'Definitely Yes',
    'Probably Yes',
    'Not Sure',
    'No'
  ];

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }
    if (!selectedQuality) {
      alert('Please select session quality');
      return;
    }
    if (!selectedRecommendation) {
      alert('Please select recommendation option');
      return;
    }

    const feedbackData = {
      rating,
      quality: selectedQuality,
      recommendation: selectedRecommendation,
      name: name || 'Anonymous',
      comments
    };

    console.log('Feedback submitted:', feedbackData);
    alert('Thank you for your feedback!');
  };

  const handleSkip = () => {
    console.log('Feedback skipped');
  };

  return (
    <div className="rating-container">
      <button className="skip-btn" onClick={handleSkip}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Skip
      </button>

      <div className="rating-card">
        <h1 className="rating-title">Rate Your Session</h1>
        <p className="rating-subtitle">How was your experience with Dr. Yahia Hassan?</p>

        {/* Star Rating */}
        <div className="star-rating-section">
          <label className="rating-label">Overall Rating <span className="required">*</span></label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-button ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <svg viewBox="0 0 24 24" fill={star <= (hoveredRating || rating) ? '#f39c12' : 'none'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={star <= (hoveredRating || rating) ? '#f39c12' : '#e0e0e0'} strokeWidth="2"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Session Quality */}
        <div className="rating-question">
          <label className="rating-label">How would you rate the session quality? <span className="required">*</span></label>
          <div className="rating-options">
            {qualityOptions.map((option, index) => (
              <button
                key={index}
                className={`rating-option ${selectedQuality === option ? 'selected' : ''}`}
                onClick={() => setSelectedQuality(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="rating-question">
          <label className="rating-label">Would you recommend this therapist to others? <span className="required">*</span></label>
          <div className="rating-options">
            {recommendationOptions.map((option, index) => (
              <button
                key={index}
                className={`rating-option ${selectedRecommendation === option ? 'selected' : ''}`}
                onClick={() => setSelectedRecommendation(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Name (Optional) */}
        <div className="rating-question">
          <label className="rating-label">Your Name (Optional)</label>
          <input
            type="text"
            className="rating-input"
            placeholder="Enter your name or leave blank for anonymous"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Additional Comments */}
        <div className="rating-question">
          <label className="rating-label">Additional Comments (Optional)</label>
          <textarea
            className="rating-textarea"
            placeholder="Share your thoughts about the session..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows="5"
          />
        </div>

        {/* Submit Button */}
        <button className="submit-feedback-btn" onClick={handleSubmit}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Submit Feedback
        </button>

        <p className="required-note">* Required fields</p>
      </div>
    </div>
  );
};

export default Rating;