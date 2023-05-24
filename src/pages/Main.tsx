import React from 'react';
import { useEffect } from 'react';

import Header from '../components/Header/Header';
import InputTodo from '../components/Todo/InputTodo';
import TodoList from '../components/Todo/TodoList';
import RecommendProvider from '../contexts/RecommendContext';
import { useTodoActions } from '../contexts/TodoContext';

const Main = () => {
  const { handleGetTodoList } = useTodoActions();

  useEffect(() => {
    handleGetTodoList();
  }, []);

  return (
    <RecommendProvider>
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo />
          <TodoList />
        </div>
      </div>
    </RecommendProvider>
  );
};

export default Main;
