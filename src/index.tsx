import App from './App';
import ReactDOM from 'react-dom/client';
import React from 'react';
import TodoProvider from './contexts/TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <TodoProvider>
    <App />
  </TodoProvider>
);
