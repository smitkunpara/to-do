'use client';

import { Task } from '@/types/task';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    if (isToggling || isDeleting) return;
    setIsToggling(true);
    await onToggle(task.id);
    setIsToggling(false);
  };

  const handleDelete = async () => {
    if (isToggling || isDeleting) return;
    setIsDeleting(true);
    await onDelete(task.id);
    setIsDeleting(false);
  };

  return (
    <div className={`flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
      isDeleting ? 'opacity-50' : ''
    }`}>
      {/* Task completion checkbox */}
      <button
        onClick={handleToggle}
        disabled={isToggling || isDeleting}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {task.completed && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Task title */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm sm:text-base break-words ${
          task.completed
            ? 'line-through text-gray-500'
            : 'text-gray-900'
        } bg-transparent`}>
          {task.title}
        </p>
        <p className="text-xs text-gray-400 mt-1 bg-transparent">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-shrink-0">
        {/* Toggle button */}
        <button
          onClick={handleToggle}
          disabled={isToggling || isDeleting}
          className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 ${
            task.completed
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          } ${isToggling || isDeleting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isToggling ? '...' : task.completed ? 'Undo' : 'Complete'}
        </button>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={isToggling || isDeleting}
          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? '...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
