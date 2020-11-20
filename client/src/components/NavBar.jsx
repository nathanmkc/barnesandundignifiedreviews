import React from 'react';

function NavBar ({start, end, total, leftArrowClickHandler, rightArrowClickHandler}) {
  return (
    <div class="app-component sort-bar">
      <div>
        {start + 1}-{end} of {total} Reviews
      </div>
      <div class="arrows">
        <div class="left-arrow" onClick={leftArrowClickHandler}>Left</div>
        <div onClick={rightArrowClickHandler}>Right</div>
      </div>
    </div>
  );
};

export default NavBar;