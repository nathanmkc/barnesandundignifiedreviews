import React from 'react';
import Filter from './Filter.jsx';
import ClearAllButton from './ClearAllButton.jsx';

function Filters({filters, filterClickHandler, clearAllClickHandler}) {
  return (
    <div>
      <div className="app-component sort-bar">
        Active Filters
      </div>
      <div className="app-component sort-bar filter-bar">
        {filters.map((filter) => {
          return <Filter filter={filter} filterClickHandler={filterClickHandler} />
        })}
        <ClearAllButton clearAllClickHandler={clearAllClickHandler}/>
      </div>
    </div>
  );
}

export default Filters;
