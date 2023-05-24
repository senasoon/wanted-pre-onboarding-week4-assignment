import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';

import useFocus from '../../hooks/useFocus';
import SearchDropdown from '../Search/SearchDropdown';
import { useRecommendActions, useRecommendValue } from '../../contexts/RecommendContext';
import { useTodoActions, useTodoValue } from '../../contexts/TodoContext';

const InputTodo = () => {
  const { ref, setFocus } = useFocus<HTMLInputElement>();

  const { setInputText } = useRecommendActions();
  const { inputText } = useRecommendValue();

  const setFocusHandler = useCallback(() => {
    setFocus();
  }, []);

  useEffect(() => {
    setFocusHandler();
  }, [setFocusHandler]);

  const { handleSubmit } = useTodoActions();
  const { isSubmitLoading } = useTodoValue();

  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(inputText);
    setInputText('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmitTodo}>
      <BiSearch className="search" />
      <input
        className="input-text ellipsis"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        disabled={isSubmitLoading}
      />
      {!isSubmitLoading ? (
        <button className="input-submit" type="submit"></button>
      ) : (
        <FaSpinner className="spinner" />
      )}
      <SearchDropdown />
    </form>
  );
};

export default InputTodo;
