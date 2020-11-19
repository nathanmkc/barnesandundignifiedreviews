import React from 'react';
import ReviewAuthorSummary from './ReviewAuthorSummary.jsx';
import ReviewBody from './ReviewBody.jsx';

function Review ({review}) {
  return (
    <div class="app-component review-box">
      <ReviewAuthorSummary review={review}/>
      <ReviewBody review={review}/>
    </div>
  );
};

export default Review;