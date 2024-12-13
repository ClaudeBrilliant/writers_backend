import { Category } from '../interfaces/category.interface';
import { mapPrismaCategoryToInterface } from '../helpers/category';
import prisma from '../config/db.config';




/**
 * Create a new category
 */
export const createCategory = async (categoryData: Partial<Category>): Promise<Category> => {
  const prismaCategory = await prisma.category.create({
    data: {
      name: categoryData.name!,
      description: categoryData.description || null, // Convert undefined to null for Prisma
    },
  });

  return mapPrismaCategoryToInterface(prismaCategory);
};

/**
 * Get all categories (excluding deleted ones)
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const prismaCategories = await prisma.category.findMany({
    where: { isDeleted: false },
  });

  return prismaCategories.map(mapPrismaCategoryToInterface);
};

/**
 * Get a single category by ID
 */
export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
  const prismaCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!prismaCategory || prismaCategory.isDeleted) {
    return null; // Return null if category is deleted or not found
  }

  return mapPrismaCategoryToInterface(prismaCategory);
};

/**
 * Update a category by ID
 */
export const updateCategory = async (
  categoryId: string,
  updateData: Partial<Category>
): Promise<Category | null> => {
  const prismaCategory = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: updateData.name,
      description: updateData.description || null, // Convert undefined to null
    },
  });

  return mapPrismaCategoryToInterface(prismaCategory);
};

/**
 * Soft-delete a category by ID (set isDeleted to true)
 */
export const deleteCategory = async (categoryId: string): Promise<Category | null> => {
  const prismaCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { isDeleted: true },
  });

  return mapPrismaCategoryToInterface(prismaCategory);
};
