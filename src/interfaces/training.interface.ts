import {TrainingApplication} from "@prisma/client";

export interface TrainingInterface {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  price: number; // Ensure it's a number to match the database schema
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  // Relations
  applications?: TrainingApplication[]; // Optional to avoid type conflicts
}
