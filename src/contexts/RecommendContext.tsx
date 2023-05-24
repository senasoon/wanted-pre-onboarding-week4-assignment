import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSearchTodo } from '../api/search';
import { RECOMMEND_LIMIT_PER_PAGE } from '../constants/search';
import useDebounce from '../hooks/useDebounce';

interface IDefaultRecommendValue {
  searchList: string[];
  hasNextPage: boolean;
  isLoading: boolean;
  page: number;
  inputText: string;
}

interface IDefaultRecommendActions {
  getSearchTodoList: () => Promise<void>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const defaultRecommendValue = {
  searchList: [],
  hasNextPage: true,
  isLoading: false,
  page: 1,
  inputText: '',
};

const RecommendValueContext = createContext<IDefaultRecommendValue>(defaultRecommendValue);
const RecommendActionsContext = createContext<IDefaultRecommendActions>({
  getSearchTodoList: () => Promise.resolve(),
  setPage: () => null,
  setInputText: () => null,
});

export default function RecommendProvider({ children }: { children: React.ReactNode }) {
  const [searchList, setSearchList] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [inputText, setInputText] = useState<string>('');

  const debouncedInputText = useDebounce(inputText, 500);

  const getSearchTodoList = async () => {
    if (!debouncedInputText) {
      setSearchList([]);
      return;
    }
    if (!hasNextPage) return;
    try {
      setIsLoading(true);

      const { data } = await getSearchTodo(debouncedInputText, page);
      if (data.page > 1) {
        setSearchList(prev => [...prev, ...data.result]);
      } else {
        setSearchList(data.result);
      }
      setHasNextPage(data.total - page * RECOMMEND_LIMIT_PER_PAGE > 0 ? true : false);
      setPage(data.page + 1);
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasNextPage(true);
    setSearchList([]);
    getSearchTodoList();
  }, [debouncedInputText]);

  const actions = { getSearchTodoList, setPage, setInputText };

  return (
    <RecommendActionsContext.Provider value={actions}>
      <RecommendValueContext.Provider
        value={{ searchList, hasNextPage, isLoading, page, inputText }}
      >
        {children}
      </RecommendValueContext.Provider>
    </RecommendActionsContext.Provider>
  );
}

export function useRecommendValue() {
  const value = useContext(RecommendValueContext);
  return value;
}

export function useRecommendActions() {
  const actions = useContext(RecommendActionsContext);
  return actions;
}
