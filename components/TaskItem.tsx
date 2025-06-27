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
        {/* Delete button with SVG icon */}
        <button
          onClick={handleDelete}
          disabled={isToggling || isDeleting}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete task"
        >
          {isDeleting ? (
            <div className="w-4 h-4 text-gray-400">...</div>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
