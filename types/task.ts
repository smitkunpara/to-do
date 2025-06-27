export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}
