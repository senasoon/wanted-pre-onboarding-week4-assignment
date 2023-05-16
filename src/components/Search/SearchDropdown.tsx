import React from 'react';
import SearchItem from './SearchItem';

interface SearchDropdownProps {
  recommends: string[];
  inputText: string;
}

const SearchDropdown = ({ recommends, inputText }: SearchDropdownProps) => {
  return (
    <div className="dropdown">
      <div className="dropdown-inner">
        <ul className="search-list">
          {recommends.map(recommend => (
            <SearchItem key={self.crypto.randomUUID()} title={recommend} inputText={inputText} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchDropdown;
