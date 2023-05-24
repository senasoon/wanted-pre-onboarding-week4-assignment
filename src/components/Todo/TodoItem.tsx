import React, { useState } from 'react';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useTodoActions } from '../../contexts/TodoContext';

interface TodoItemProps {
  id: string;
  title: string;
}

const TodoItem = ({ id, title }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleRemove } = useTodoActions();

  const handleRemoveTodo = async () => {
    try {
      setIsLoading(true);
      await handleRemove(id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="item">
      <span className="ellipsis">{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={handleRemoveTodo}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
