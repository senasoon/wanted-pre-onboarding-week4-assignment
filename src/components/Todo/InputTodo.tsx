import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../../api/todo';
import useFocus from '../../hooks/useFocus';
import { SetTodos } from '../../types/todo';
import SearchDropdown from '../Search/SearchDropdown';
import useDebounce from '../../hooks/useDebounce';

interface InputTodoProps {
  setTodos: SetTodos;
}

const InputTodo = ({ setTodos }: InputTodoProps) => {
  const [inputText, setInputText] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { ref, setFocus } = useFocus<HTMLInputElement>();

  const setFocusHandler = useCallback(() => {
    setFocus();
  }, []);

  useEffect(() => {
    setFocusHandler();
  }, [setFocusHandler]);

  const debouncedInputText = useDebounce(inputText, 500);

  const handleSubmit = useCallback(
    async e => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos(prev => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <BiSearch className="search" />
      <input
        className="input-text ellipsis"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        disabled={isLoading}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit"></button>
      ) : (
        <FaSpinner className="spinner" />
      )}
      {isInputFocused && <SearchDropdown inputText={debouncedInputText} />}
    </form>
  );
};

export default InputTodo;
