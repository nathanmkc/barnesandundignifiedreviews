import React from 'react';
import StarRatings from 'react-star-ratings';
import moment from 'moment';

function ReviewBody ({review}) {
  return (
    <div class="review-body">
      <div class="review-body-rating">
        <StarRatings
          rating={review.rating}
          starDimension="14px"
          starSpacing=".5px"
          starRatedColor="orange"
        />
        <span class="review-body-dot">·</span><span class="review-body-moment">{moment(review.createdAt).fromNow()}</span>
      </div>
      <div class="review-body-title">
        {review.title}
      </div>
      <div class="review-body-text">
        {review.body}
      </div>
    </div>
  );
};

export default ReviewBody;