import { PrismaClient } from '@prisma/client';
import { TrainingApplication } from '../interfaces/training.application.interface';
import { ApplicationStatus } from '../interfaces/enums';

const prisma = new PrismaClient();

/**
 * Helper: Map Prisma TrainingApplication to Custom TrainingApplication Interface
 */
const mapPrismaTrainingApplicationToCustom = (prismaTrainingApplication: any): TrainingApplication => ({
  id: prismaTrainingApplication.id,
  trainingId: prismaTrainingApplication.trainingId,
  userId: prismaTrainingApplication.userId,
  status: prismaTrainingApplication.status as ApplicationStatus, // Cast to custom enum
  createdAt: prismaTrainingApplication.createdAt,
  updatedAt: prismaTrainingApplication.updatedAt,
  isDeleted: prismaTrainingApplication.isDeleted,
  phone:prismaTrainingApplication.phone,
  mpesaCode:prismaTrainingApplication.mpesaCode,
  training: {
    ...prismaTrainingApplication.training,
    price: prismaTrainingApplication.training?.price?.toNumber(), // Convert Decimal to number
  },
  user: prismaTrainingApplication.user,
});

/**
 * Create a training application
 */
export const createTrainingApplication = async (
  data: Omit<TrainingApplication, 'id' | 'createdAt' | 'updatedAt' | 'training' | 'user'>
): Promise<TrainingApplication> => {
  try {
    if (!data.trainingId || !data.userId) {
      throw new Error('Training ID and User ID are required to create a training application.');
    }

    const prismaTrainingApplication = await prisma.trainingApplication.create({
      data: {
        status: data.status,
        isDeleted: false,
        user: { connect: { id: data.userId } },
        training: { connect: { id: data.trainingId } },
        phone:data.phone,
        mpesaCode:data.mpesaCode
      },
      include: { training: true, user: true }, // Include relations in response
    });

    return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
  } catch (error) {
    console.error('Error creating training application:', error);
    throw new Error('Error creating training application');
  }
};

/**
 * Get all training applications
 */
export const getTrainingApplications = async (): Promise<TrainingApplication[]> => {
  try {
    const prismaTrainingApplications = await prisma.trainingApplication.findMany({
      where: { isDeleted: false },
      include: { training: true, user: true }, // Include relations
    });

    return prismaTrainingApplications.map(mapPrismaTrainingApplicationToCustom);
  } catch (error) {
    console.error('Error fetching training applications:', error);
    throw new Error('Error fetching training applications');
  }
};

/**
 * Get a training application by ID
 */
export const getTrainingApplicationById = async (id: string): Promise<TrainingApplication | null> => {
  try {
    if (!id) throw new Error('Training application ID is required.');

    const prismaTrainingApplication = await prisma.trainingApplication.findUnique({
      where: { id },
      include: { training: true, user: true }, // Include relations
    });

    return prismaTrainingApplication
      ? mapPrismaTrainingApplicationToCustom(prismaTrainingApplication)
      : null;
  } catch (error) {
    console.error('Error fetching training application by ID:', error);
    throw new Error('Error fetching training application by ID');
  }
};

/**
 * Update a training application
 */
export const updateTrainingApplication = async (
  id: string,
  data: Partial<Omit<TrainingApplication, 'training' | 'user'>>
): Promise<TrainingApplication> => {
  try {
    if (!id) throw new Error('Training application ID is required.');

    const prismaTrainingApplication = await prisma.trainingApplication.update({
      where: { id },
      data,
      include: { training: true, user: true }, // Include relations
    });

    return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
  } catch (error) {
    console.error('Error updating training application:', error);
    throw new Error('Error updating training application');
  }
};

/**
 * Soft delete a training application
 */
export const deleteTrainingApplication = async (id: string): Promise<TrainingApplication> => {
  try {
    if (!id) throw new Error('Training application ID is required.');

    const prismaTrainingApplication = await prisma.trainingApplication.update({
      where: { id },
      data: { isDeleted: true },
      include: { training: true, user: true }, // Include relations
    });

    return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
  } catch (error) {
    console.error('Error deleting training application:', error);
    throw new Error('Error deleting training application');
  }
};

/**
 * Update the status of a training application
 */
export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus
): Promise<TrainingApplication> => {
  try {
    if (!id) throw new Error('Training application ID is required.');

    const prismaTrainingApplication = await prisma.trainingApplication.update({
      where: { id },
      data: { status },
      include: { training: true, user: true }, // Include relations
    });

    return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
  } catch (error) {
    console.error('Error updating application status:', error);
    throw new Error('Error updating application status');
  }
};
