import React from 'react';
import ReviewAuthorSummary from './ReviewAuthorSummary.jsx';
import ReviewBody from './ReviewBody.jsx';

function Review ({review, voteClickHandler}) {
  return (
    <div class="app-component review-box">
      <ReviewAuthorSummary review={review}/>
      <ReviewBody review={review} voteClickHandler={voteClickHandler}/>
    </div>
  );
};

export default Review;