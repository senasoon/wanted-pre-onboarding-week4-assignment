import React from 'react';
import SearchItem from './SearchItem';

const SearchDropdown = () => {
  return (
    <div className="dropdown">
      <div className="dropdown-inner">
        <ul className="search-list">
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
        </ul>
      </div>
    </div>
  );
};

export default SearchDropdown;
