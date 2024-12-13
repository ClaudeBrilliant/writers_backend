"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrismaProfileToCustomProfile = void 0;
const mapPrismaProfileToCustomProfile = (prismaProfile) => {
    return {
        id: prismaProfile.id,
        userId: prismaProfile.userId,
        firstName: prismaProfile.firstName,
        lastName: prismaProfile.lastName,
        bio: prismaProfile.bio,
        phoneNumber: prismaProfile.phoneNumber,
        address: prismaProfile.address,
        skills: prismaProfile.skills,
        completedTasksCount: prismaProfile.completedTasksCount,
        createdAt: prismaProfile.createdAt,
        updatedAt: prismaProfile.updatedAt,
        isDeleted: prismaProfile.isDeleted,
        user: prismaProfile.user ? {
            id: prismaProfile.user.id,
            email: prismaProfile.user.email,
            password: prismaProfile.user.password,
            role: prismaProfile.user.role,
            status: prismaProfile.user.status,
            emailVerified: prismaProfile.user.emailVerified,
            isActivated: prismaProfile.user.isActivated,
            createdAt: prismaProfile.user.createdAt,
            updatedAt: prismaProfile.user.updatedAt,
            isDeleted: prismaProfile.user.isDeleted,
            fullName: prismaProfile.user.fullName,
        } : null,
    };
};
exports.mapPrismaProfileToCustomProfile = mapPrismaProfileToCustomProfile;
