import React from 'react';

function Filter({filter, filterClickHandler}) {
  if (filter === 1) {
    return (
      <div onClick={() => {filterClickHandler(filter)}}>
        {filter} Star
      </div>
    );
  } else {
    return (
      <div onClick={() => {filterClickHandler(filter)}}>
        {filter} Stars
      </div>
    );
  }
}

export default Filter;