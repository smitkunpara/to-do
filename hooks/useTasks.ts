'use client';

import { useState, useEffect } from 'react';
import { Task, ApiResponse } from '@/types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/tasks');
      const data: ApiResponse<Task[]> = await response.json();
      
      if (data.success && data.data) {
        setTasks(data.data);
      } else {
        setError(data.message || 'Failed to fetch tasks');
      }
    } catch {
      setError('Network error: Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (title: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
      });
      
      const data: ApiResponse<Task> = await response.json();
      
      if (data.success && data.data) {
        setTasks(prev => [...prev, data.data!]);
        return true;
      } else {
        setError(data.message || 'Failed to add task');
        return false;
      }
    } catch {
      setError('Network error: Failed to add task');
      return false;
    }
  };

  // Toggle task completion
  const toggleTask = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      const task = tasks.find(t => t.id === id);
      if (!task) return false;

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      
      const data: ApiResponse<Task> = await response.json();
      
      if (data.success && data.data) {
        setTasks(prev => 
          prev.map(t => t.id === id ? data.data! : t)
        );
        return true;
      } else {
        setError(data.message || 'Failed to update task');
        return false;
      }
    } catch {
      setError('Network error: Failed to update task');
      return false;
    }
  };

  // Delete a task
  const deleteTask = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      
      const data: ApiResponse<Task> = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.filter(t => t.id !== id));
        return true;
      } else {
        setError(data.message || 'Failed to delete task');
        return false;
      }
    } catch {
      setError('Network error: Failed to delete task');
      return false;
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
