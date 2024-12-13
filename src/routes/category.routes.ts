import { Router } from 'express';
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

// Restricting certain routes to admin role
const adminOnly = authorizeRole(['ADMIN']);

/**
 * Category routes
 */
router.post('/', createCategoryController);
router.get('/', getAllCategoriesController);
router.get('/:id', getCategoryByIdController);
router.put('/:id', authenticateJWT, adminOnly, updateCategoryController);
router.delete('/:id', authenticateJWT, adminOnly, deleteCategoryController);

export default router;
