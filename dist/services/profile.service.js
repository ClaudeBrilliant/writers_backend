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
exports.deleteProfile = exports.updateProfile = exports.getProfileById = exports.getAllProfiles = exports.createProfile = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const profile_1 = require("../helpers/profile");
const createProfile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaProfile = yield db_config_1.default.profile.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                phoneNumber: data.phoneNumber,
                address: data.address,
                skills: data.skills,
                completedTasksCount: data.completedTasksCount,
                isDeleted: data.isDeleted,
                user: { connect: { id: data.userId } },
            },
            include: { user: true },
        });
        return (0, profile_1.mapPrismaProfileToCustomProfile)(prismaProfile);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating profile');
    }
});
exports.createProfile = createProfile;
const getAllProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaProfiles = yield db_config_1.default.profile.findMany({
            where: { isDeleted: false },
            include: { user: true },
        });
        return prismaProfiles.map(profile_1.mapPrismaProfileToCustomProfile);
    }
    catch (error) {
        throw new Error('Error fetching profiles');
    }
});
exports.getAllProfiles = getAllProfiles;
const getProfileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaProfile = yield db_config_1.default.profile.findUnique({
            where: { id },
            include: { user: true },
        });
        return prismaProfile ? (0, profile_1.mapPrismaProfileToCustomProfile)(prismaProfile) : null;
    }
    catch (error) {
        throw new Error('Error fetching profile by ID');
    }
});
exports.getProfileById = getProfileById;
const updateProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = {
            firstName: data.firstName,
            lastName: data.lastName,
            bio: data.bio,
            phoneNumber: data.phoneNumber,
            address: data.address,
            skills: data.skills,
            completedTasksCount: data.completedTasksCount,
            isDeleted: data.isDeleted,
        };
        // Handle user relation if userId is provided
        if (data.userId) {
            updateData.user = { connect: { id: data.userId } };
        }
        const prismaProfile = yield db_config_1.default.profile.update({
            where: { id },
            data: updateData,
            include: { user: true },
        });
        return (0, profile_1.mapPrismaProfileToCustomProfile)(prismaProfile);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error updating profile');
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaProfile = yield db_config_1.default.profile.update({
            where: { id },
            data: { isDeleted: true },
            include: { user: true },
        });
        return (0, profile_1.mapPrismaProfileToCustomProfile)(prismaProfile);
    }
    catch (error) {
        throw new Error('Error deleting profile');
    }
});
exports.deleteProfile = deleteProfile;
