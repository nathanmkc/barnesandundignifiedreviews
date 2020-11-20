import React from 'react';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';
import HelpfulVoter from './HelpfulVoter.jsx';

function ReviewBody ({review, voteClickHandler}) {
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
      <div class="spoiler-bar">
        <span class="spoiler-bar-static">
          Review Contains Spoilers:
        </span>
        <span class="spoiler-bar-variable">
          {review.spoilers ? 'Yes' : 'No'}
        </span>
      </div>
      <div class="spoiler-bar">
        <span class="spoiler-bar-static">
          <Icon name="tags" className="tag-icon"/>Tags:
        </span>
        <span class="spoiler-bar-variable">
          {review.tags.map((tag) => {
            return (
              <span class="tag">
                {tag.tagName + ','}
              </span>
          )})}
        </span>
      </div>
      {review.recommended &&
        <div class="spoiler-bar">
          <span class="spoiler-bar-static">
            <Icon name="check circle" className="check-icon"/>Yes,
          </span>
          <span class="spoiler-bar-variable">
            I recommend this product.
          </span>
        </div>
      }
      <HelpfulVoter review={review} voteClickHandler={voteClickHandler}/>
    </div>
  );
};

export default ReviewBody;