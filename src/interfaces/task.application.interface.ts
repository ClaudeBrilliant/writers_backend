import { ApplicationStatus } from './enums';
import { Task } from './task.interface';
import { User } from './user.interface';

export interface TaskApplication {
  id: string;
  taskId: string;
  userId: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  
  // Relations
  task: Task;
  user: User;
}