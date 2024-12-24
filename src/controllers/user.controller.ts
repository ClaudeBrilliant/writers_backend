import { Request, Response, NextFunction } from 'express';
import {getAllUsers, getUserById, updateUser, deleteUser, updateUserBalance} from '../services/user.service';
import logger from '../config/logger.config'; // Assuming you have a logger set up

/**
 * Get all users
 */
export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching all users');
    const users = await getAllUsers();
    logger.info(`Fetched ${users.length} users`);
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error fetching users:', error);
    next(error);
  }
};

/**
 * Get user by ID
 */
export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching user with ID: ${id}`);
    const user = await getUserById(id);

    if (!user) {
      logger.warn(`User with ID: ${id} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`Fetched user with ID: ${id}`);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching user with ID: ${req.params.id}`, error);
    next(error);
  }
};

/**
 * Update user
 */
export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info(`Updating user with ID: ${id}`);
    logger.debug('Request body:', req.body);

    const updatedUser = await updateUser(id, req.body);

    if (!updatedUser) {
      logger.warn(`User with ID: ${id} not found for update`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User with ID: ${id} updated successfully`);
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    logger.error(`Error updating user with ID: ${req.params.id}`, error);
    next(error);
  }
};


export const payUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { incrementAmount } = req.body; // The amount to increment

    logger.info(`Updating user balance for ID: ${id}`);
    logger.debug(`Increment amount: ${incrementAmount}`);

    // Validate input
    if (typeof incrementAmount !== 'number' || incrementAmount <= 0) {
      logger.warn('Invalid increment amount provided');
      return res.status(400).json({ message: 'Invalid increment amount' });
    }

    // Call the service to update the balance
    const updatedUser = await updateUserBalance(id, incrementAmount);

    if (!updatedUser) {
      logger.warn(`User with ID: ${id} not found for balance update`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User balance for ID: ${id} updated successfully`);
    res.status(200).json({
      message: 'User balance updated successfully',
      updatedUser,
    });
  } catch (error) {
    logger.error(`Error updating balance for user with ID: ${req.params.id}`, error);
    next(error);
  }
};

/**
 * Delete user
 */
export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info(`Deleting user with ID: ${id}`);

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      logger.warn(`User with ID: ${id} not found for deletion`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User with ID: ${id} deleted successfully`);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting user with ID: ${req.params.id}`, error);
    next(error);
  }
};
