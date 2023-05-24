import React, { createContext, useContext, useState } from 'react';
import { getTodoList, createTodo, deleteTodo } from '../api/todo';
import { Todo } from '../types/todo';

interface IDefaultTodoValue {
  todoListData: Todo[];
  isSubmitLoading: boolean;
}

interface IDefaultTodoActions {
  handleGetTodoList: () => Promise<void>;
  handleSubmit: (inputText: string) => Promise<void>;
  handleRemove: (id: string) => Promise<void>;
}

const defaultTodoValue = {
  todoListData: [],
  isSubmitLoading: false,
};

const TodoValueContext = createContext<IDefaultTodoValue>(defaultTodoValue);
const TodoActionsContext = createContext<IDefaultTodoActions>({
  handleGetTodoList: () => Promise.resolve(),
  handleSubmit: (inputText: string) => Promise.resolve(),
  handleRemove: (id: string) => Promise.resolve(),
});

export default function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoListData, setTodoListData] = useState<Todo[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const handleGetTodoList = async () => {
    const { data } = await getTodoList();
    setTodoListData(data || []);
  };

  const handleSubmit = async (inputText: string) => {
    try {
      setIsSubmitLoading(true);

      const trimmed = inputText.trim();
      if (!trimmed) {
        return alert('Please write something');
      }

      const newItem = { title: trimmed };
      const { data } = await createTodo(newItem);
      if (data) {
        return setTodoListData(prev => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await deleteTodo(id);

      setTodoListData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  const actions = { handleGetTodoList, handleSubmit, handleRemove };
  const value = { todoListData, isSubmitLoading };

  return (
    <TodoActionsContext.Provider value={actions}>
      <TodoValueContext.Provider value={value}>{children}</TodoValueContext.Provider>
    </TodoActionsContext.Provider>
  );
}

export function useTodoValue() {
  const value = useContext(TodoValueContext);
  return value;
}

export function useTodoActions() {
  const actions = useContext(TodoActionsContext);
  return actions;
}
