import { ApplicationStatus, User, Training } from '@prisma/client';

export interface TrainingApplication {
  id: string;
  trainingId: string;
  userId: string;
  status: ApplicationStatus; // Use Prisma's Status enum
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  phone:string;
  mpesaCode:string;

  // Relations
  training: Training; // Use Prisma's Training type
  user: User;         // Use Prisma's User type
}
