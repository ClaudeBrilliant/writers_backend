import { User } from './user.interface';

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  bio?: string | null; // Adjusted for Prisma's nullable type
  phoneNumber?: string | null;
  address?: string | null;
  skills: string[];
  completedTasksCount: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  // Relations
  user?: User | null; // Adjusted for potential nullability
}
