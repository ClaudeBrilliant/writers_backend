import { Decimal } from '@prisma/client/runtime/library';
import { User } from './user.interface';

export interface Transaction {
  id: string;
  userId: string;
  amount: Decimal;
  type: string; // ACTIVATION_FEE, TASK_PAYMENT, etc.
  status: string; // PENDING, COMPLETED, FAILED
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  email : string;
  phoneNumber: string;

  // Relations
  user?: User; // Optional to avoid Prisma type issues during updates
}
