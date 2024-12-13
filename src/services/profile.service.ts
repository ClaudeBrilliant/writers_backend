import prisma from '../config/db.config';
import { mapPrismaProfileToCustomProfile } from '../helpers/profile';
import { Profile } from '../interfaces/profile.interface';

export const createProfile = async (
  data: Omit<Profile, 'id' | 'createdAt' | 'updatedAt' | 'user'> & { userId: string }
): Promise<Profile> => {
  try {
    const prismaProfile = await prisma.profile.create({
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

    return mapPrismaProfileToCustomProfile(prismaProfile);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating profile');
  }
};

export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    const prismaProfiles = await prisma.profile.findMany({
      where: { isDeleted: false },
      include: { user: true },
    });

    return prismaProfiles.map(mapPrismaProfileToCustomProfile);
  } catch (error) {
    throw new Error('Error fetching profiles');
  }
};

export const getProfileById = async (id: string): Promise<Profile | null> => {
  try {
    const prismaProfile = await prisma.profile.findUnique({
      where: { id },
      include: { user: true },
    });

    return prismaProfile ? mapPrismaProfileToCustomProfile(prismaProfile) : null;
  } catch (error) {
    throw new Error('Error fetching profile by ID');
  }
};

export const updateProfile = async (
  id: string,
  data: Omit<Partial<Profile>, 'userId' | 'user'> & { userId?: string }
): Promise<Profile> => {
  try {
    const updateData: any = {
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

    const prismaProfile = await prisma.profile.update({
      where: { id },
      data: updateData,
      include: { user: true },
    });

    return mapPrismaProfileToCustomProfile(prismaProfile);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating profile');
  }
};

export const deleteProfile = async (id: string): Promise<Profile> => {
  try {
    const prismaProfile = await prisma.profile.update({
      where: { id },
      data: { isDeleted: true },
      include: { user: true },
    });

    return mapPrismaProfileToCustomProfile(prismaProfile);
  } catch (error) {
    throw new Error('Error deleting profile');
  }
};
