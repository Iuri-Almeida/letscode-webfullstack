export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  labels: string[];
  done: boolean;
}