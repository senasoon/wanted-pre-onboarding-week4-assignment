export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type SetTodos = React.Dispatch<React.SetStateAction<Todo[]>>;
