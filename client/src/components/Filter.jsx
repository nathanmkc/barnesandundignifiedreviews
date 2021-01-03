import React from 'react';
import {Icon} from 'semantic-ui-react';

function Filter({filter, filterClickHandler}) {
  if (filter === 1) {
    return (
      <div className="filter" onClick={() => {filterClickHandler(filter)}}>
        {filter} Star <Icon className='filter-x' circular color='blue' size='tiny' name='close' />
      </div>
    );
  } else {
    return (
      <div className = "filter" onClick={() => {filterClickHandler(filter)}}>
        {filter} Stars <Icon className='filter-x' circular color='blue' size='tiny' name='close' />
      </div>
    );
  }
}

export default Filter;