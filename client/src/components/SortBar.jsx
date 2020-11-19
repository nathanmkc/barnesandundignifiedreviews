import React from 'react';

function SortBar ({start, end, total}) {
  return (
    <div class="app-component sort-bar">
      <div>
        {start}-{end} of {total} Reviews
      </div>
      <div>
        Sort by: Featured
      </div>
    </div>
  );
};

export default SortBar;