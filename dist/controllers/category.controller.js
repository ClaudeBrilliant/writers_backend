"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.getCategoryByIdController = exports.getAllCategoriesController = exports.createCategoryController = void 0;
const category_service_1 = require("../services/category.service");
const error_middleware_1 = require("../middlewares/error.middleware");
/**
 * Handle errors
 */
const handleControllerError = (error, res, next) => {
    if (error instanceof error_middleware_1.AppError) {
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
const createCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        const result = yield (0, category_service_1.createCategory)(categoryData);
        res.status(201).json({
            message: 'Category created successfully',
            category: result,
        });
    }
    catch (error) {
        handleControllerError(error, res, next);
    }
});
exports.createCategoryController = createCategoryController;
/**
 * Get all categories
 */
const getAllCategoriesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, category_service_1.getAllCategories)();
        res.status(200).json({
            message: 'Categories retrieved successfully',
            categories: result,
        });
    }
    catch (error) {
        handleControllerError(error, res, next);
    }
});
exports.getAllCategoriesController = getAllCategoriesController;
/**
 * Get a category by ID
 */
const getCategoryByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, category_service_1.getCategoryById)(id);
        if (!result) {
            return res.status(404).json({
                message: 'Category not found or has been deleted',
            });
        }
        res.status(200).json({
            message: 'Category retrieved successfully',
            category: result,
        });
    }
    catch (error) {
        handleControllerError(error, res, next);
    }
});
exports.getCategoryByIdController = getCategoryByIdController;
/**
 * Update a category by ID
 */
const updateCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = yield (0, category_service_1.updateCategory)(id, updateData);
        if (!result) {
            return res.status(404).json({
                message: 'Category not found or has been deleted',
            });
        }
        res.status(200).json({
            message: 'Category updated successfully',
            category: result,
        });
    }
    catch (error) {
        handleControllerError(error, res, next);
    }
});
exports.updateCategoryController = updateCategoryController;
/**
 * Soft delete a category by ID
 */
const deleteCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, category_service_1.deleteCategory)(id);
        if (!result) {
            return res.status(404).json({
                message: 'Category not found or has been deleted',
            });
        }
        res.status(200).json({
            message: 'Category deleted successfully',
            category: result,
        });
    }
    catch (error) {
        handleControllerError(error, res, next);
    }
});
exports.deleteCategoryController = deleteCategoryController;
