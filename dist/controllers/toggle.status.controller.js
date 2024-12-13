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
exports.toggleUserStatusController = exports.AccountStatus = void 0;
const user_service_1 = require("../services/user.service");
const logger_config_1 = __importDefault(require("../config/logger.config"));
// AccountStatus Enum
exports.AccountStatus = Object.freeze({
    PENDING: 'PENDING',
    ACTIVATED: 'ACTIVATED',
    SUSPENDED: 'SUSPENDED',
    VERIFIED: 'VERIFIED'
});
// Define the status order array
const statusOrder = [
    exports.AccountStatus.PENDING,
    exports.AccountStatus.ACTIVATED,
    exports.AccountStatus.SUSPENDED,
    exports.AccountStatus.VERIFIED
];
/**

/**
 * Toggle user status
 */
const toggleUserStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_config_1.default.info(`Toggling status for user with ID: ${id}`);
        const user = yield (0, user_service_1.getUserById)(id);
        if (!user) {
            logger_config_1.default.warn(`User with ID: ${id} not found`);
            return res.status(404).json({ message: 'User not found' });
        }
        // Find the next status
        const currentIndex = statusOrder.indexOf(user.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length; // Cycle back to the start
        const nextStatus = statusOrder[nextIndex];
        // Simulate updating the user's status (replace with your update logic)
        const updatedUser = yield (0, user_service_1.updateUser)(id, { status: nextStatus });
        console.log('User status updated successfully:', updatedUser);
        res.status(200).json({ message: 'User status updated', updatedUser });
    }
    catch (error) {
        logger_config_1.default.error(`Error toggling status for user with ID: ${req.params.id}`, error);
        next(error);
    }
});
exports.toggleUserStatusController = toggleUserStatusController;
