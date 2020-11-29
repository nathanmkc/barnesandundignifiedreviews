import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const sortOptions = [
  {
    key: 'Featured',
    text: 'Featured',
    value: 'Featured',
  },
  {
    key: 'Most Recent',
    text: 'Most Recent',
    value: 'Elliot Fu',
  },
  {
    key: 'Most Helpful',
    text: 'Most Helpful',
    value: 'Stevie Feliciano',
  },
  {
    key: 'Highest to Lowest Rating',
    text: 'Highest to Lowest Rating',
    value: 'Highest to Lowest Rating',
  },
  {
    key: 'Lowest to Highest Rating',
    text: 'Lowest to Highest Rating',
    value: 'Lowest to Highest Rating',
  },
]

function SortBar ({start, end, total, handleSortMenuChange}) {
  return (
    <div className="app-component sort-bar">
      <div>
        {start + 1}-{end} of {total} Reviews
      </div>
      <span className="sort-dropdown">
        Sort by:{' '}
        <Dropdown
          inline
          simple
          item
          options={sortOptions}
          defaultValue={sortOptions[0].value}
          onChange={handleSortMenuChange}
        />
      </span>
    </div>
  );
};

export default SortBar;