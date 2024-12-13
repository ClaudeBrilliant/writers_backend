import { Request, Response, NextFunction } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignUserToTask, getTasksByAssignedUserId, getAllTasksSubmitted, getAllTasksOPEN,
} from '../services/task.service';

/**
 * Create a new task
 */
export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const task = await createTask(data);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all tasks
 */
export const getAllTasksController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};


export const getAllTasksSubmittedController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await getAllTasksSubmitted();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};


export const getAllTasksOpenController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await getAllTasksOPEN();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a task by ID
 */
export const getTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;
    const task = await getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a task by assigned user ID
 */
export const getTaskByAssignedUserIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;
    const task = await getTasksByAssignedUserId(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task
 */
export const updateTaskController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;
    const data = req.body;
    const updatedTask = await updateTask(taskId, data);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * Soft delete a task
 */
export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await deleteTask(taskId);
    res.status(200).json(deletedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * Assign a user to a task
 */
export const assignUserToTaskController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId, assignedToId } = req.body;
    const assignedTask = await assignUserToTask(taskId, assignedToId);
    res.status(200).json(assignedTask);
  } catch (error) {
    next(error);
  }
};
