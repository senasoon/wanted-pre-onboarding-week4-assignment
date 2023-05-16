import React from 'react';
import { useEffect, useState } from 'react';

import { getTodoList } from '../api/todo';
import Header from '../components/Header/Header';
import InputTodo from '../components/Todo/InputTodo';
import TodoList from '../components/Todo/TodoList';
import { Todo } from '../types/todo';

const Main = () => {
  const [todoListData, setTodoListData] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
