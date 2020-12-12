import React from 'react';

function ClearAllButton({clearAllClickHandler}) {
  return (
    <div onClick={clearAllClickHandler}>
      Clear All
    </div>
  );
}

export default ClearAllButton;