// src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos = [] }) => (
  <div className="bg-gray-900 p-4 rounded shadow-md w-full space-y-4">
    <h2 className="text-2xl text-center mb-4">Todo List</h2>
    {todos.length > 0 ? (
      todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))
    ) : (
      <p className="text-center text-gray-400">
        No todos available. Add a new one to get started!
      </p>
    )}
  </div>
);

export default TodoList;
