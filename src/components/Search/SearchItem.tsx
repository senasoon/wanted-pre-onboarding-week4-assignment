import React from 'react';
import { useRecommendActions } from '../../contexts/RecommendContext';
import { useTodoActions } from '../../contexts/TodoContext';

interface SearchItem {
  title: string;
  inputText: string;
}

const SearchItem = ({ title, inputText }: SearchItem) => {
  const textArray = title.split(new RegExp(`(${inputText})`, 'gi'));

  const { handleSubmit } = useTodoActions();
  const { setInputText } = useRecommendActions();

  const handleSubmitRecommend = () => {
    handleSubmit(title);
    setInputText('');
  };

  return (
    <li>
      <button onClick={handleSubmitRecommend} type="button" className="search-item ellipsis">
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
