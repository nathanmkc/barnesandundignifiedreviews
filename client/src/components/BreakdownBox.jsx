import React from 'react';
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';

function BreakdownBox ({avgRating}) {
  return (
      <div class="app-component breakdown-box">
        <div class="breakdown-box-top-bar">
          <h2 class="breakdown-box">REVIEWS</h2>
          <Button className="write-review-button" children="Write a Review"/>
        </div>
        <div class="breakdown-box-bottom">
          <div class="breakdown-box-section">
            <h4>Rating Snapshot</h4>
            <p>Select a row below to filter reviews.</p>
          </div>
          <div class="breakdown-box-section">
            <h4>Average Customer Ratings</h4>
            <div class="breakdown-box-summary">
              <div class="breakdown-box-stars">
                Overall
                <StarRatings
                  rating={avgRating}
                  starDimension="14px"
                  starSpacing=".5px"
                  starRatedColor="orange"
                  className="breakdown-box-summary-stars"
                />
              </div>
              {avgRating}
            </div>
          </div>
        </div>
      </div>
  )
};

export default BreakdownBox;