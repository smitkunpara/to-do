'use client';

import { useTasks } from '@/hooks/useTasks';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  const { tasks, loading, error, addTask, toggleTask, deleteTask, refetch } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 To-Do List
          </h1>
          <p className="text-gray-600">
            Stay organized and get things done!
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Task Form */}
          <TaskForm onAddTask={addTask} disabled={loading} />

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
                <button
                  onClick={refetch}
                  className="text-red-600 hover:text-red-800 text-sm underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Task Statistics */}
          {!loading && tasks.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-4">
                  <span className="text-blue-700">
                    Total: <strong>{tasks.length}</strong>
                  </span>
                  <span className="text-blue-700">
                    Pending: <strong>{tasks.filter(t => !t.completed).length}</strong>
                  </span>
                  <span className="text-blue-700">
                    Completed: <strong>{tasks.filter(t => t.completed).length}</strong>
                  </span>
                </div>
                {tasks.length > 0 && (
                  <div className="text-blue-700">
                    Progress: <strong>
                      {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
                    </strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Task List */}
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            loading={loading}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
