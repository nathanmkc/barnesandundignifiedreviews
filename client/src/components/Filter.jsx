import React from 'react';

function Filter({filter, filterClickHandler}) {
  return (
    <div onClick={() => {filterClickHandler(filter)}}>
      {filter}
    </div>
  );
}

export default Filter;