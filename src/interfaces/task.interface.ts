import { TaskStatus } from './enums';
import { User } from './user.interface';
import { TaskApplication } from './task.application.interface';

export interface Task {
  id: string;
  title: string;
  description: string;
  price: number;
  deadline: Date;
  requirementsUrl?: string;
  imageUrl?: string;
  status: TaskStatus;
  assignedToId?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  
  // Relations
  assignedTo?: User;
  applications?: TaskApplication[];
}