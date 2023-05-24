import React from 'react';
import { useTodoValue } from '../../contexts/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todoListData } = useTodoValue();

  return todoListData.length ? (
    <ul>
      {todoListData.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
