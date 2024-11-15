// src/components/TodoItem.jsx
import React from 'react';

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h3 className="text-lg font-bold text-white">{todo.title}</h3>
      <p className="text-gray-400">{todo.description}</p>
      <p className="text-sm text-gray-500">
        Deadline: {new Date(todo.deadline).toLocaleDateString()}
      </p>
      <div className="mt-4 flex gap-2">
        {/* Button for updating the "completed" status */}
        <button
          className={`py-1 px-3 rounded ${
            todo.completed
              ? 'bg-yellow-600 hover:bg-yellow-700'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
          onClick={() => onUpdateTodo(todo._id, { ...todo, completed: !todo.completed })}
        >
          {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        
        {/* Button for deleting the todo */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
          onClick={() => onDeleteTodo(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
