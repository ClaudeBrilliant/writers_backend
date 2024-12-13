import { User } from './user.interface';

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  
  // Relations
  users?: User[];
}