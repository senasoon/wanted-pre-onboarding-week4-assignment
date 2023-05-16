import React from 'react';

interface SearchItem {
  title: string;
  inputText: string;
}

const SearchItem = ({ title, inputText }: SearchItem) => {
  const textArray = title.split(new RegExp(`(${inputText})`, 'gi'));
  console.log(textArray);
  return (
    <li>
      <button type="button" className="search-item ellipsis">
        {textArray.map((text, index) => (
          <React.Fragment key={self.crypto.randomUUID()}>
            {index % 2 !== 0 && <span className="highlight-keyword">{text}</span>}
            {index % 2 === 0 && <span>{text}</span>}
          </React.Fragment>
        ))}
      </button>
    </li>
  );
};

export default SearchItem;
