import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && deadline) {
      onAddTodo({
        title,
        description,
        deadline,
      });
      setTitle('');
      setDescription('');
      setDeadline('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-gray-800 p-4 rounded space-y-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
      />
      
      {/* Label and id for the deadline input */}
      <label htmlFor="deadline" className="text-gray-400">Deadline</label>
      <input
        id="deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
      />

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
