"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrismaCategoryToInterface = void 0;
const mapPrismaCategoryToInterface = (prismaCategory) => {
    var _a;
    return {
        id: prismaCategory.id,
        name: prismaCategory.name,
        description: (_a = prismaCategory.description) !== null && _a !== void 0 ? _a : undefined, // Convert null to undefined
        createdAt: prismaCategory.createdAt,
        updatedAt: prismaCategory.updatedAt,
        isDeleted: prismaCategory.isDeleted,
        users: prismaCategory.users, // Include relations if needed
    };
};
exports.mapPrismaCategoryToInterface = mapPrismaCategoryToInterface;
