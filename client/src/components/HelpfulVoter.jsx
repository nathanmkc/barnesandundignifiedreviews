import React from 'react';

function HelpfulVoter ({review, voteClickHandler, disabled}) {
  return (
    <div className="helpful-voter">
      <p >
        Helpful?
      </p>
      <p style={{cursor: disabled ? 'default' : 'pointer'}} className="helpful-item helpful-voter-yes" onClick={()=>{voteClickHandler('yes', review._id)}}>
        Yes · {review.helpfulYes}
      </p>
      <p style={{cursor: disabled ? 'default' : 'pointer'}} className="helpful-item helpful-voter-no" onClick={()=>{voteClickHandler('no', review._id)}}>
        No · {review.helpfulNo}
      </p>
      <p stype={{cursor: 'pointer'}} className="helpful-item helpful-voter-report">
        Report
      </p>
    </div>
  );
};

export default HelpfulVoter;