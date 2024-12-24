import { Router } from 'express';
import {
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    payUserController,
    withdrawMoneyUserController
} from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares';
import { authorizeRole } from '../middlewares';
import { toggleUserStatusController } from '../controllers/toggle.status.controller';

const router = Router();

// User routes
router.get('/user/:id', authenticateJWT, getUserByIdController);//get current user
router.get("/admin/users", authenticateJWT, authorizeRole(["ADMIN"]), getAllUsersController);
// router.get('/admin/users', authenticateJWT, authorizeRole(['admin']), getAllUsersController); // Get all users
router.get('/:id', authenticateJWT, authorizeRole(['ADMIN', 'USER']), getUserByIdController); // Get user by ID
router.put('/:id', authenticateJWT, authorizeRole(['ADMIN', 'USER']), updateUserController); // Update user
router.put('/pay/:id', authenticateJWT, authorizeRole(['ADMIN']), payUserController); // pay user
router.put('/withdraw/:id', authenticateJWT,  authorizeRole(['ADMIN', 'USER']), withdrawMoneyUserController); // withdraw user
router.delete('/:id', authenticateJWT, authorizeRole(['ADMIN']), deleteUserController); // Delete user
router.put('/admin/users/:id/toggle-status', authenticateJWT, authorizeRole(['ADMIN']), toggleUserStatusController);//toggle status
export default router;
