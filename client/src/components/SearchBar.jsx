import React from 'react';
import SearchIcon from '@material-ui/icons/Search';


function SearchBar ({handleSearchChange}) {
  return (
      <form className="search-bar">
        <label>
          <input type="text" className="search-input" placeholder="Search topics and reviews" onChange={handleSearchChange}/>
        </label>
        <SearchIcon font-size="large" style={{padding: "5px 25px", position: "absolute", "background-color": "#ededed"}}/>
      </form>
  )
};

export default SearchBar;