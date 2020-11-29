import React from 'react';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';
import HelpfulVoter from './HelpfulVoter.jsx';

function ReviewBody ({review, voteClickHandler, disabled}) {
  return (
    <div className="review-body">
      <div className="review-body-rating">
        <StarRatings
          rating={review.rating}
          starDimension="14px"
          starSpacing=".5px"
          starRatedColor="orange"
        />
        <span className="review-body-dot">·</span><span className="review-body-moment">{moment(review.createdAt).fromNow()}</span>
      </div>
      <div className="review-body-title">
        {review.title}
      </div>
      <div className="review-body-text">
        {review.body}
      </div>
      <div className="spoiler-bar">
        <span className="spoiler-bar-static">
          Review Contains Spoilers:
        </span>
        <span className="spoiler-bar-variable">
          {review.spoilers ? 'Yes' : 'No'}
        </span>
      </div>
      <div className="spoiler-bar">
        <span className="spoiler-bar-static">
          <Icon name="tags" className="tag-icon"/>Tags:
        </span>
        <span className="spoiler-bar-variable">
          {review.tags.map((tag) => {
            return (
              <span className="tag">
                {tag.tagName + ','}
              </span>
          )})}
        </span>
      </div>
      {review.recommended &&
        <div className="spoiler-bar">
          <span className="spoiler-bar-static">
            <Icon name="check circle" className="check-icon"/>Yes,
          </span>
          <span className="spoiler-bar-variable">
            I recommend this product.
          </span>
        </div>
      }
      <HelpfulVoter review={review} disabled={disabled} voteClickHandler={voteClickHandler}/>
    </div>
  );
};

export default ReviewBody;