import React from 'react';

function ReviewAuthorSummary ({review}) {
  return (
    <div className="review-author-summary">
      <h3>{review.author}</h3>
      <p>{review.location}</p>
      <p className="review-stats">Reviews <em>{review.authorReviews}</em></p>
      <p className="review-stats">Votes <em>{review.votes}</em></p>
      <p>Reader Type: <em>{review.readerType}</em></p>
    </div>
  );
};

export default ReviewAuthorSummary;