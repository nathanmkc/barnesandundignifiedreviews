import React from 'react';
import SearchBar from './SearchBar.jsx';
import StarRatings from 'react-star-ratings';

function SearchBox({ avgRating, reviewCount, recommendedReviewCount, handleSearchChange }) {
    return (
      <div className="app-component search-box">
        <div className="summary-bar">
          <div className="summary-bar-line-one">
            <div className="summary-element summary-stars">
              <StarRatings
              rating={avgRating}
              starDimension="14px"
              starSpacing=".5px"
              starRatedColor="orange"
            />
            </div>
            <div className="summary-element avg-review">
              {avgRating}
            </div>
            <div className="summary-element review-count">
              {reviewCount} Reviews
            </div>
          </div>
          <div className="summary-bar-line-two">
            {recommendedReviewCount} out of {reviewCount} ({((recommendedReviewCount/reviewCount)*100).toFixed(0)}%) reviewers recommend this product
          </div>
        </div>
        <SearchBar handleSearchChange={handleSearchChange}/>
      </div>
    );
};

export default SearchBox;