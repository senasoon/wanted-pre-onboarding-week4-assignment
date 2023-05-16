import React from 'react';

interface SearchItem {
  title: string;
}

const SearchItem = ({ title }: SearchItem) => {
  return (
    <li>
      <button type="button" className="search-item ellipsis">
        {title}
      </button>
    </li>
  );
};

export default SearchItem;
