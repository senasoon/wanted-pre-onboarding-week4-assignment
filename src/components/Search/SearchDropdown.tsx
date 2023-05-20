import React, { useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import SearchItem from './SearchItem';
import { getSearchTodo } from '../../api/search';
import { RECOMMEND_LIMIT_PER_PAGE } from '../../constants/search';

interface SearchDropdownProps {
  inputText: string;
}

const SearchDropdown = ({ inputText }: SearchDropdownProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [searchList, setSearchList] = useState<string[]>([]);

  const target = useRef<HTMLLIElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const page = useRef<number>(1);

  const getSearchTodoList = async () => {
    if (!inputText || !hasNextPage) return;
    try {
      setIsLoading(true);

      const { data } = await getSearchTodo(inputText, page.current);
      setSearchList(prev => [...prev, ...data.result]);
      setHasNextPage(data.total - page.current * RECOMMEND_LIMIT_PER_PAGE > 0 ? true : false);
      page.current += 1;
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

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
  }, [getSearchTodoList, page]);

  return (
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
  );
};

export default SearchDropdown;
