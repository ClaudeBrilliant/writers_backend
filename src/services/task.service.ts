import { PrismaClient, Task, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Create a new task
 * @param data Task creation data
 * @returns Created task
 */
export const createTask = async (data: Prisma.TaskCreateInput): Promise<Task> => {
  try {
    // Validate input data
    if (!data.title || !data.description || !data.price || !data.deadline) {
      throw new Error('Missing required task fields');
    }

    // Create task in database
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        deadline: data.deadline,
        status: data.status || 'OPEN',
        imageUrl: data.imageUrl,
        requirementsUrl: data.requirementsUrl
      }
    });

    return task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Get all non-deleted tasks
 * @returns List of tasks
 */
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    return await prisma.task.findMany({
      where: { 
        isDeleted: false 
      },
      orderBy: { 
        createdAt: 'desc' 
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};




export const getAllTasksSubmitted = async (): Promise<Task[]> => {
  try {
    return await prisma.task.findMany({
      where: {
        status: 'SUBMITTED'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};



export const getAllTasksOPEN = async (): Promise<Task[]> => {
  try {
    return await prisma.task.findMany({
      where: {
        status: 'OPEN'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};


/**
 * Get a task by its ID
 * @param taskId Task identifier
 * @returns Task or null
 */
export const getTaskById = async (taskId: string): Promise<Task | null> => {
  try {
    return await prisma.task.findUnique({
      where: { 
        id: taskId,
        isDeleted: false 
      }
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

/**
 * Get tasks by their assigned user ID
 * @param assignedToId User ID to filter tasks by
 * @returns Array of tasks
 */
export const getTasksByAssignedUserId = async (assignedToId: string): Promise<Task[]> => {
  try {
    return await prisma.task.findMany({
      where: {
        assignedToId: assignedToId,
        isDeleted: false,
      },
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};




/**
 * Update a task
 * @param taskId Task identifier
 * @param data Update data
 * @returns Updated task
 */
export const updateTask = async (taskId: string, data: Prisma.TaskUpdateInput): Promise<Task> => {
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: data
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Soft delete a task
 * @param taskId Task identifier
 * @returns Deleted task
 */
export const deleteTask = async (taskId: string): Promise<Task> => {
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: { isDeleted: true }
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

/**
 * Assign a user to a task
 * @param taskId Task identifier
 * @param userId User identifier
 * @returns Updated task
 */
export const assignUserToTask = async (taskId: string, assignedToId: string): Promise<Task> => {
  if (!taskId || !assignedToId) {
    throw new Error('taskId and assignedToId are required.');
  }
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: {
        assignedToId: assignedToId,
        status: 'IN_PROGRESS' // Assuming you want to change status when assigned
      }
    });
  } catch (error) {
    console.error('Error assigning task:', error);
    throw error;
  }
};

// Export the prisma client for potential direct use
export { prisma };