import React from 'react';

function HelpfulVoter ({review, voteClickHandler}) {
  return (
    <div className="helpful-voter">
      <p>
        Helpful?
      </p>
      <p onClick={()=>{voteClickHandler('yes', review._id)}}>
        Yes
      </p>
      <p onClick={()=>{voteClickHandler('no', review._id)}}>
        No
      </p>
      <p>
        Report
      </p>
    </div>
  );
};

export default HelpfulVoter;