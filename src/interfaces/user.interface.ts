import { Role, AccountStatus } from './enums';
import { Profile } from './profile.interface';
import { TaskApplication } from './task.application.interface';
import { TrainingApplication } from './training.application.interface';
import { Task } from './task.interface';
import { Transaction } from './transaction.interface';
import { Category } from './category.interface';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  status: AccountStatus;
  emailVerified: boolean;
  isActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  fullName: string;
  
  // Relations
  profile?: Profile | null;
  taskApplications?: TaskApplication[];
  trainingApplications?: TrainingApplication[];
  assignedTasks?: Task[];
  transactions?: Transaction[];
  categoryId?: string;
  category?: Category;
}