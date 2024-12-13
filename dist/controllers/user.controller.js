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
exports.deleteUserController = exports.updateUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const user_service_1 = require("../services/user.service");
const logger_config_1 = __importDefault(require("../config/logger.config")); // Assuming you have a logger set up
/**
 * Get all users
 */
const getAllUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_config_1.default.info('Fetching all users');
        const users = yield (0, user_service_1.getAllUsers)();
        logger_config_1.default.info(`Fetched ${users.length} users`);
        res.status(200).json(users);
    }
    catch (error) {
        logger_config_1.default.error('Error fetching users:', error);
        next(error);
    }
});
exports.getAllUsersController = getAllUsersController;
/**
 * Get user by ID
 */
const getUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_config_1.default.info(`Fetching user with ID: ${id}`);
        const user = yield (0, user_service_1.getUserById)(id);
        if (!user) {
            logger_config_1.default.warn(`User with ID: ${id} not found`);
            return res.status(404).json({ message: 'User not found' });
        }
        logger_config_1.default.info(`Fetched user with ID: ${id}`);
        res.status(200).json(user);
    }
    catch (error) {
        logger_config_1.default.error(`Error fetching user with ID: ${req.params.id}`, error);
        next(error);
    }
});
exports.getUserByIdController = getUserByIdController;
/**
 * Update user
 */
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_config_1.default.info(`Updating user with ID: ${id}`);
        logger_config_1.default.debug('Request body:', req.body);
        const updatedUser = yield (0, user_service_1.updateUser)(id, req.body);
        if (!updatedUser) {
            logger_config_1.default.warn(`User with ID: ${id} not found for update`);
            return res.status(404).json({ message: 'User not found' });
        }
        logger_config_1.default.info(`User with ID: ${id} updated successfully`);
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    }
    catch (error) {
        logger_config_1.default.error(`Error updating user with ID: ${req.params.id}`, error);
        next(error);
    }
});
exports.updateUserController = updateUserController;
/**
 * Delete user
 */
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_config_1.default.info(`Deleting user with ID: ${id}`);
        const deletedUser = yield (0, user_service_1.deleteUser)(id);
        if (!deletedUser) {
            logger_config_1.default.warn(`User with ID: ${id} not found for deletion`);
            return res.status(404).json({ message: 'User not found' });
        }
        logger_config_1.default.info(`User with ID: ${id} deleted successfully`);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        logger_config_1.default.error(`Error deleting user with ID: ${req.params.id}`, error);
        next(error);
    }
});
exports.deleteUserController = deleteUserController;
