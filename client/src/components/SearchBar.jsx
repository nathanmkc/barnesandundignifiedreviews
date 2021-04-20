import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ handleSearchChange }) {
  return (
    <form className="search-bar">
      <label>
        <input type="text" className="search-input" placeholder="Search topics and reviews" onChange={handleSearchChange} />
      </label>
      <SearchIcon
        fontSize="x-large"
        style={
       {
         position: 'absolute', 'backgroundColor': '#ededed', width: '70px', padding: '4px', height: '32px',
       }
      }
      />
    </form>
  );
}

export default SearchBar;
