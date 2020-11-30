import React from 'react';
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';

import SnapshotBars from './SnapshotBars.jsx';

function BreakdownBox ({ratingSummary, ratingClickHandler}) {
  return (
      <div className="app-component breakdown-box">
        <div className="breakdown-box-top-bar">
          <h2 className="breakdown-box">REVIEWS</h2>
          <Button className="write-review-button" children="Write a Review"/>
        </div>
        <div className="breakdown-box-bottom">
          <div className="breakdown-box-section">
            <h4>Rating Snapshot</h4>
            <p>Select a row below to filter reviews.</p>
          </div>
          <div className="breakdown-box-section">
            <h4>Average Customer Ratings</h4>
            <div className="breakdown-box-summary">
              <div className="breakdown-box-stars">
                Overall
                <StarRatings
                  rating={ratingSummary.avgRating}
                  starDimension="14px"
                  starSpacing=".5px"
                  starRatedColor="orange"
                  className="breakdown-box-summary-stars"
                />
              </div>
              {ratingSummary.avgRating}
            </div>
          </div>
        </div>
        <SnapshotBars ratingSummary={ratingSummary} ratingClickHandler={ratingClickHandler} />
      </div>
  )
};

export default BreakdownBox;