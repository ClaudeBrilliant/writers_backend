"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const toggle_status_controller_1 = require("../controllers/toggle.status.controller");
const router = (0, express_1.Router)();
// User routes
router.get('/user/:id', middlewares_1.authenticateJWT, user_controller_1.getUserByIdController); //get current user
router.get("/admin/users", middlewares_1.authenticateJWT, (0, middlewares_2.authorizeRole)(["ADMIN"]), user_controller_1.getAllUsersController);
// router.get('/admin/users', authenticateJWT, authorizeRole(['admin']), getAllUsersController); // Get all users
router.get('/:id', middlewares_1.authenticateJWT, (0, middlewares_2.authorizeRole)(['ADMIN', 'USER']), user_controller_1.getUserByIdController); // Get user by ID
router.put('/:id', middlewares_1.authenticateJWT, (0, middlewares_2.authorizeRole)(['ADMIN', 'USER']), user_controller_1.updateUserController); // Update user
router.delete('/:id', middlewares_1.authenticateJWT, (0, middlewares_2.authorizeRole)(['ADMIN']), user_controller_1.deleteUserController); // Delete user
router.put('/admin/users/:id/toggle-status', middlewares_1.authenticateJWT, (0, middlewares_2.authorizeRole)(['ADMIN']), toggle_status_controller_1.toggleUserStatusController); //toggle status
exports.default = router;
