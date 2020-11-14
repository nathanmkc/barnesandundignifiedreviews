import React from 'react';
import StarRatings from 'react-star-ratings';

function SearchBox ({avgRating, reviewCount}) {
    return (
     <div class="app-component search-box">
        <div class="summary-bar">
          <div class="summary-bar-line-one">
            <div class="summary-element">
              <StarRatings
              rating={avgRating}
              starDimension="14px"
              starSpacing=".5px"
              starRatedColor="orange"
            />
            </div>
            <div class="summary-element avg-review">
              {avgRating}
            </div>
            <div class="summary-element review-count">
              {reviewCount} Reviews
            </div>
         </div>
       </div>
     </div>
    );
};

export default SearchBox;