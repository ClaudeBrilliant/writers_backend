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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_1 = require("../helpers/category");
const db_config_1 = __importDefault(require("../config/db.config"));
/**
 * Create a new category
 */
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaCategory = yield db_config_1.default.category.create({
        data: {
            name: categoryData.name,
            description: categoryData.description || null, // Convert undefined to null for Prisma
        },
    });
    return (0, category_1.mapPrismaCategoryToInterface)(prismaCategory);
});
exports.createCategory = createCategory;
/**
 * Get all categories (excluding deleted ones)
 */
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const prismaCategories = yield db_config_1.default.category.findMany({
        where: { isDeleted: false },
    });
    return prismaCategories.map(category_1.mapPrismaCategoryToInterface);
});
exports.getAllCategories = getAllCategories;
/**
 * Get a single category by ID
 */
const getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaCategory = yield db_config_1.default.category.findUnique({
        where: { id: categoryId },
    });
    if (!prismaCategory || prismaCategory.isDeleted) {
        return null; // Return null if category is deleted or not found
    }
    return (0, category_1.mapPrismaCategoryToInterface)(prismaCategory);
});
exports.getCategoryById = getCategoryById;
/**
 * Update a category by ID
 */
const updateCategory = (categoryId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaCategory = yield db_config_1.default.category.update({
        where: { id: categoryId },
        data: {
            name: updateData.name,
            description: updateData.description || null, // Convert undefined to null
        },
    });
    return (0, category_1.mapPrismaCategoryToInterface)(prismaCategory);
});
exports.updateCategory = updateCategory;
/**
 * Soft-delete a category by ID (set isDeleted to true)
 */
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaCategory = yield db_config_1.default.category.update({
        where: { id: categoryId },
        data: { isDeleted: true },
    });
    return (0, category_1.mapPrismaCategoryToInterface)(prismaCategory);
});
exports.deleteCategory = deleteCategory;
