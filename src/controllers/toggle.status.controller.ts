import { Request, Response, NextFunction } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../services/category.service';
import { AppError } from '../middlewares/error.middleware';
import { getUserById, updateUser } from '../services/user.service';
import logger from '../config/logger.config';

// AccountStatus Enum
export const AccountStatus = Object.freeze({
  PENDING: 'PENDING',
  ACTIVATED: 'ACTIVATED',
  SUSPENDED: 'SUSPENDED',
  VERIFIED: 'VERIFIED'
});

// Define the status order array
const statusOrder = [
  AccountStatus.PENDING,
  AccountStatus.ACTIVATED,
  AccountStatus.SUSPENDED,
  AccountStatus.VERIFIED
];
/**

/**
 * Toggle user status
 */
export const toggleUserStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      logger.info(`Toggling status for user with ID: ${id}`);
  
      const user = await getUserById(id);
      if (!user) {
        logger.warn(`User with ID: ${id} not found`);
        return res.status(404).json({ message: 'User not found' });
      }

      // Find the next status
      const currentIndex = statusOrder.indexOf(user.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length; // Cycle back to the start
      const nextStatus = statusOrder[nextIndex];

      // Simulate updating the user's status (replace with your update logic)
      const updatedUser = await updateUser(id, { status: nextStatus });

      console.log('User status updated successfully:', updatedUser);
      res.status(200).json({ message: 'User status updated', updatedUser });
    } catch (error) {
      logger.error(`Error toggling status for user with ID: ${req.params.id}`, error);
      next(error);
    }
  };
  