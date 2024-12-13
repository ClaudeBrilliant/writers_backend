"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
// Restricting certain routes to admin role
const adminOnly = (0, role_middleware_1.authorizeRole)(['ADMIN']);
/**
 * Category routes
 */
router.post('/', category_controller_1.createCategoryController);
router.get('/', category_controller_1.getAllCategoriesController);
router.get('/:id', category_controller_1.getCategoryByIdController);
router.put('/:id', auth_middleware_1.authenticateJWT, adminOnly, category_controller_1.updateCategoryController);
router.delete('/:id', auth_middleware_1.authenticateJWT, adminOnly, category_controller_1.deleteCategoryController);
exports.default = router;
