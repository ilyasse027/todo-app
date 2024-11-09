// src/components/TodoItem.jsx
import React from 'react';

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{todo.title}</h3>
      <p className="text-gray-400">{todo.description}</p>
      <p className="text-sm text-gray-500">Deadline: {new Date(todo.deadline).toLocaleDateString()}</p>
      <div className="mt-4 flex gap-2">
        <button
          className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
          onClick={() => onUpdateTodo(todo._id, { ...todo, completed: !todo.completed })}
        >
          {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button
          className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
          onClick={() => onDeleteTodo(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
