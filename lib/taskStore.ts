// In-memory data store for tasks
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Use globalThis to persist data across module reloads in development
declare global {
  var taskStore: {
    tasks: Task[];
    nextId: number;
  } | undefined;
}

if (!globalThis.taskStore) {
  globalThis.taskStore = {
    tasks: [],
    nextId: 1
  };
}

const tasks = globalThis.taskStore.tasks;
let nextId = globalThis.taskStore.nextId;

export function getTasks(): Task[] {
  return tasks;
}

export function addTask(taskData: Omit<Task, 'id'>): Task {
  const newTask: Task = {
    id: nextId++, // Generate ID only when actually creating a task
    ...taskData
  };
  console.log('addTask created:', newTask);
  tasks.push(newTask);
  // Update the global store
  globalThis.taskStore!.nextId = nextId;
  console.log('current tasks after add:', tasks);
  return newTask;
}

export function updateTask(id: number, updates: Partial<Task>): Task | null {
  console.log('updateTask called with:', { id, updates, currentTasks: tasks });
  const taskIndex = tasks.findIndex(task => task.id === id);
  console.log('taskIndex found:', taskIndex);
  if (taskIndex === -1) return null;
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  console.log('updated task:', tasks[taskIndex]);
  return tasks[taskIndex];
}

export function deleteTask(id: number): Task | null {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  
  return tasks.splice(taskIndex, 1)[0];
}
