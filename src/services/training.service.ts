import {Prisma, PrismaClient, Training as PrismaTraining} from '@prisma/client';
import { TrainingInterface as TrainingInterface } from '../interfaces/training.interface';
import {Decimal} from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

/**
 * Helper: Map Prisma Training to Custom Training Interface
 */
const mapPrismaTrainingToCustomTraining = (prismaTraining: PrismaTraining): TrainingInterface => <TrainingInterface>({
  id: prismaTraining.id,
  title: prismaTraining.title,
  description: prismaTraining.description,
  startDate: prismaTraining.startDate,
  endDate: prismaTraining.endDate,
  capacity: prismaTraining.capacity,
  price: (prismaTraining.price as Decimal).toNumber(), // Convert Decimal to number
  createdAt: prismaTraining.createdAt,
  updatedAt: prismaTraining.updatedAt,
  isDeleted: prismaTraining.isDeleted,
});

/**
 * Create a new training
 */
export const createTraining = async (
    data: Prisma.TrainingCreateInput
): Promise<TrainingInterface> => {
  try {
    const prismaTraining = await prisma.training.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        capacity: data.capacity,
        price: data.price,
        isDeleted: data.isDeleted || false,
      },
    });

    return mapPrismaTrainingToCustomTraining(prismaTraining);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating training session');
  }
};

/**
 * Get all training sessions
 */
export const getAllTrainings = async (): Promise<TrainingInterface[]> => {
  try {
    const prismaTrainings = await prisma.training.findMany({
      where: { isDeleted: false },
    });

    return prismaTrainings.map(mapPrismaTrainingToCustomTraining);
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching training sessions');
  }
};

/**
 * Get a training session by ID
 */
export const getTrainingById = async (id: string): Promise<TrainingInterface | null> => {
  try {
    const prismaTraining = await prisma.training.findUnique({
      where: { id },
    });

    return prismaTraining ? mapPrismaTrainingToCustomTraining(prismaTraining) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching training session by ID');
  }
};

/**
 * Update a training session
 */
export const updateTraining = async (
    id: string,
    data: Prisma.TrainingUpdateInput
): Promise<TrainingInterface> => {
  try {
    const prismaTraining = await prisma.training.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return mapPrismaTrainingToCustomTraining(prismaTraining);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating training session');
  }
};

/**
 * Soft delete a training session (set `isDeleted` to true)
 */
export const deleteTraining = async (id: string): Promise<TrainingInterface> => {
  try {
    const prismaTraining = await prisma.training.update({
      where: { id },
      data: {
        isDeleted: true,
        updatedAt: new Date(),
      },
    });

    return mapPrismaTrainingToCustomTraining(prismaTraining);
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting training session');
  }
};
