import React from 'react';
import ReviewAuthorSummary from './ReviewAuthorSummary.jsx';
import ReviewBody from './ReviewBody.jsx';

function Review ({review, voteClickHandler, disabled}) {
  return (
    <div className="app-component review-box">
      <ReviewAuthorSummary review={review}/>
      <ReviewBody review={review} voteClickHandler={voteClickHandler} disabled={disabled}/>
    </div>
  );
};

export default Review;