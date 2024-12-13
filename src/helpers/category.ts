import { Category } from "../interfaces/category.interface";

 export const mapPrismaCategoryToInterface = (prismaCategory: any): Category => {
    return {
      id: prismaCategory.id,
      name: prismaCategory.name,
      description: prismaCategory.description ?? undefined, // Convert null to undefined
      createdAt: prismaCategory.createdAt,
      updatedAt: prismaCategory.updatedAt,
      isDeleted: prismaCategory.isDeleted,
      users: prismaCategory.users, // Include relations if needed
    };
  };