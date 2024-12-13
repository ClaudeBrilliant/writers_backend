import { Request, Response, NextFunction } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../services/category.service';
import { AppError } from '../middlewares/error.middleware';

/**
 * Handle errors
 */
const handleControllerError = (
  error: any,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode,
    });
  }

  res.status(500).json({
    message: error.message || 'Internal Server Error',
    status: 500,
  });
};

/**
 * Create a new category
 */
export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = req.body;
    const result = await createCategory(categoryData);
    res.status(201).json({
      message: 'Category created successfully',
      category: result,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Get all categories
 */
export const getAllCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllCategories();
    res.status(200).json({
      message: 'Categories retrieved successfully',
      categories: result,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Get a category by ID
 */
export const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getCategoryById(id);

    if (!result) {
      return res.status(404).json({
        message: 'Category not found or has been deleted',
      });
    }

    res.status(200).json({
      message: 'Category retrieved successfully',
      category: result,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Update a category by ID
 */
export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await updateCategory(id, updateData);

    if (!result) {
      return res.status(404).json({
        message: 'Category not found or has been deleted',
      });
    }

    res.status(200).json({
      message: 'Category updated successfully',
      category: result,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Soft delete a category by ID
 */
export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteCategory(id);

    if (!result) {
      return res.status(404).json({
        message: 'Category not found or has been deleted',
      });
    }

    res.status(200).json({
      message: 'Category deleted successfully',
      category: result,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
