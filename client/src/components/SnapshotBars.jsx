import React from 'react';

function SnapshotBars ({ratingSummary, ratingClickHandler}) {
  return (
    <div className="snapshot-bars">
      <div className="snapshot-bar">
        <div>
          5 &#9733;
        </div>
        <div className="bars" onClick={() => {ratingClickHandler(5)}}>
          <div className="green-bar" style={{width: (200*(ratingSummary.fiveStarTotal/ratingSummary.total)).toString() + 'px'}}></div>
          <div className="gray-bar" style={{width: (200-(200*(ratingSummary.fiveStarTotal/ratingSummary.total))).toString() + 'px'}}></div>
        </div>
        <div>
          {ratingSummary.fiveStarTotal}
        </div>
      </div>
      <div className="snapshot-bar">
        <div>
          4 &#9733;
        </div>
        <div className="bars" onClick={() => {ratingClickHandler(4)}}>
          <div className="green-bar" style={{width: (200*(ratingSummary.fourStarTotal/ratingSummary.total)).toString() + 'px'}}></div>
          <div className="gray-bar" style={{width: (200-(200*(ratingSummary.fourStarTotal/ratingSummary.total))).toString() + 'px'}}></div>
        </div>
        <div>
          {ratingSummary.fourStarTotal}
        </div>
      </div>
      <div className="snapshot-bar">
        <div>
          3 &#9733;
        </div>
        <div className="bars" onClick={() => {ratingClickHandler(3)}}>
          <div className="green-bar" style={{width: (200*(ratingSummary.threeStarTotal/ratingSummary.total)).toString() + 'px'}}></div>
          <div className="gray-bar" style={{width: (200-(200*(ratingSummary.threeStarTotal/ratingSummary.total))).toString() + 'px'}}></div>
        </div>
        <div>
          {ratingSummary.threeStarTotal}
        </div>
      </div>
      <div className="snapshot-bar">
        <div>
          2 &#9733;
        </div>
        <div className="bars" onClick={() => {ratingClickHandler(2)}}>
          <div className="green-bar" style={{width: (200*(ratingSummary.twoStarTotal/ratingSummary.total)).toString() + 'px'}}></div>
          <div className="gray-bar" style={{width: (200-(200*(ratingSummary.twoStarTotal/ratingSummary.total))).toString() + 'px'}}></div>
        </div>
        <div>
          {ratingSummary.twoStarTotal}
        </div>
      </div>
      <div className="snapshot-bar">
        <div>
          1 &#9733;
        </div>
        <div className="bars" onClick={() => {ratingClickHandler(1)}}>
          <div className="green-bar" style={{width: (200*(ratingSummary.oneStarTotal/ratingSummary.total)).toString() + 'px'}}></div>
          <div className="gray-bar" style={{width: (200-(200*(ratingSummary.oneStarTotal/ratingSummary.total))).toString() + 'px'}}></div>
        </div>
        <div>
          {ratingSummary.oneStarTotal}
        </div>
      </div>
    </div>
  );
};

export default SnapshotBars;