import React, { useEffect, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import SearchItem from './SearchItem';
import { useRecommendActions, useRecommendValue } from '../../contexts/RecommendContext';

const SearchDropdown = () => {
  const target = useRef<HTMLLIElement>(null);
  const root = useRef<HTMLDivElement>(null);

  const { isLoading, searchList, page, hasNextPage, inputText } = useRecommendValue();
  const { getSearchTodoList } = useRecommendActions();

  useEffect(() => {
    if (!target.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        getSearchTodoList();
      },
      { root: root.current, threshold: 1 }
    );
    io.observe(target.current);

    return () => {
      io.disconnect();
    };
  }, [page]);

  return searchList.length > 0 ? (
    <div className="dropdown" ref={root}>
      <div className="dropdown-inner">
        <ul className="search-list">
          {searchList.map(recommend => (
            <SearchItem key={self.crypto.randomUUID()} title={recommend} inputText={inputText} />
          ))}
          {isLoading && (
            <li className="observer">
              <FaSpinner className="spinner" />
            </li>
          )}
          {hasNextPage && !isLoading && (
            <li className="observer" ref={target}>
              <BsThreeDots />
            </li>
          )}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SearchDropdown;
