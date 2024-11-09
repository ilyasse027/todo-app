import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = await getTodos();
        setTodos(todosFromServer);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await updateTodo(id, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updated : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8">Todo App</h1>
        {loading ? ( // Show loading message when loading
          <p>Loading...</p>
        ) : (
          <>
            <TodoForm onAddTodo={handleAddTodo} />
            <TodoList
              todos={todos}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
