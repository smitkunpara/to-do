'use client';

import { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => Promise<boolean>;
  disabled?: boolean;
}

export default function TaskForm({ onAddTask, disabled = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    const success = await onAddTask(title.trim());
    
    if (success) {
      setTitle(''); // Clear the input on success
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          disabled={disabled || isSubmitting}
          maxLength={200}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 bg-white placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={!title.trim() || disabled || isSubmitting}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 whitespace-nowrap"
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      {title.length > 180 && (
        <p className="text-sm text-orange-600 mt-1">
          {200 - title.length} characters remaining
        </p>
      )}
    </form>
  );
}
