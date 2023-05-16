import React from 'react';
import TodoItem from './TodoItem';
import { Todo, SetTodos } from '../../types/todo';

interface TodoListProps {
  todos: Todo[];
  setTodos: SetTodos;
}

const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
