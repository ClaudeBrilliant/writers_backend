import { PrismaClient } from '@prisma/client';
import { TaskApplication } from '../interfaces/task.application.interface';
import { ApplicationStatus } from '../interfaces/enums';

const prisma = new PrismaClient();

/**
 * Helper: Map Prisma TaskApplication to Custom TaskApplication Interface
 */
const mapPrismaTaskApplicationToCustom = (prismaTaskApplication: any): TaskApplication => ({
  id: prismaTaskApplication.id,
  taskId: prismaTaskApplication.taskId,
  userId: prismaTaskApplication.userId,
  status: prismaTaskApplication.status as ApplicationStatus, // Cast to custom enum
  createdAt: prismaTaskApplication.createdAt,
  updatedAt: prismaTaskApplication.updatedAt,
  isDeleted: prismaTaskApplication.isDeleted,
  task: {
    ...prismaTaskApplication.task,
    price: prismaTaskApplication.task?.price?.toNumber(), // Convert Decimal to number
    requirementsUrl: prismaTaskApplication.task?.requirementsUrl ?? undefined,
    imageUrl: prismaTaskApplication.task?.imageUrl ?? undefined,
    assignedToId: prismaTaskApplication.task?.assignedToId ?? undefined,
  },
  user: prismaTaskApplication.user,
});

/**
 * Create a task application
 */
export const createTaskApplication = async (
  data: Omit<TaskApplication, 'id' | 'createdAt' | 'updatedAt' | 'task' | 'user'>
): Promise<TaskApplication> => {
  try {
    const prismaTaskApplication = await prisma.taskApplication.create({
      data: {
        status: data.status,
        isDeleted: data.isDeleted,
        user: { connect: { id: data.userId } },
        task: { connect: { id: data.taskId } },
      },
      include: { task: true, user: true }, // Include relations in response
    });

    return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating task application');
  }
};

/**
 * Get all task applications
 */
export const getTaskApplications = async (): Promise<TaskApplication[]> => {
  try {
    const prismaTaskApplications = await prisma.taskApplication.findMany({
      where: { isDeleted: false },
      include: { task: true, user: true }, // Include relations
    });

    return prismaTaskApplications.map(mapPrismaTaskApplicationToCustom);
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching task applications');
  }
};

/**
 * Get a task application by ID
 */
export const getTaskApplicationById = async (id: string): Promise<TaskApplication | null> => {
  try {
    const prismaTaskApplication = await prisma.taskApplication.findUnique({
      where: { id },
      include: { task: true, user: true }, // Include relations
    });

    return prismaTaskApplication
      ? mapPrismaTaskApplicationToCustom(prismaTaskApplication)
      : null;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching task application by ID');
  }
};

/**
 * Update a task application
 */
export const updateTaskApplication = async (
  id: string,
  data: Partial<Omit<TaskApplication, 'task' | 'user'>>
): Promise<TaskApplication> => {
  try {
    const prismaTaskApplication = await prisma.taskApplication.update({
      where: { id },
      data,
      include: { task: true, user: true }, // Include relations
    });

    return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating task application');
  }
};

/**
 * Soft delete a task application
 */
export const deleteTaskApplication = async (id: string): Promise<TaskApplication> => {
  try {
    const prismaTaskApplication = await prisma.taskApplication.update({
      where: { id },
      data: { isDeleted: true },
      include: { task: true, user: true }, // Include relations
    });

    return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting task application');
  }
};

/**
 * Update the status of a task application
 */
export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus
): Promise<TaskApplication> => {
  try {
    const prismaTaskApplication = await prisma.taskApplication.update({
      where: { id },
      data: { status },
      include: { task: true, user: true }, // Include relations
    });

    return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating application status');
  }
};
