// src/__tests__/app.test.jsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';
import * as todoApi from '../api/todoApi';

vi.mock('../api/todoApi');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    todoApi.getTodos.mockResolvedValue([]);
  });

  it('should show loading state initially', async () => {
    todoApi.getTodos.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
    
    await act(async () => render(<App />));
    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
  });

  it('should show empty state when no todos exist', async () => {
    todoApi.getTodos.mockResolvedValue([]);
    
    await act(async () => render(<App />));
    await waitFor(() => {
      expect(screen.getByText('No todos available. Add a new one to get started!')).toBeInTheDocument();
    });
  });

  it('should display todos when they exist', async () => {
    const mockTodos = [{ _id: '1', title: 'Test Todo', description: 'Test Description', deadline: '2024-10-26', completed: false }];
    todoApi.getTodos.mockResolvedValue(mockTodos);
    
    await act(async () => render(<App />));
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  it('should be able to add a new todo', async () => {
    const newTodo = { _id: '1', title: 'New Todo', description: 'New Description', deadline: '2024-10-26', completed: false };
    todoApi.getTodos.mockResolvedValue([]);
    todoApi.createTodo.mockResolvedValue(newTodo);

    await act(async () => render(<App />));

    act(() => {
      fireEvent.click(screen.getByText('Add Todo'));
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Todo' } });
      fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
      fireEvent.change(screen.getByLabelText('Deadline'), { target: { value: '2024-10-26' } });
      fireEvent.click(screen.getByRole('button', { name: /add todo/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('New Todo')).toBeInTheDocument();
      expect(screen.getByText('New Description')).toBeInTheDocument();
    });

    expect(todoApi.createTodo).toHaveBeenCalledWith({
      title: 'New Todo',
      description: 'New Description',
      deadline: '2024-10-26',
    });
  });

  it('should handle API errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    todoApi.getTodos.mockRejectedValue(new Error('API Error'));

    await act(async () => render(<App />));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching todos:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});
