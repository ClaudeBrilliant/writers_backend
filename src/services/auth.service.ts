// import prisma from "../config/db.config";
// import bcrypt from "bcrypt";
// import { generateToken } from "../config/jwt.config";
// import { AppError } from "../middlewares/error.middleware";
// import logger from "../config/logger.config";

// // Register User
// export const registerUser = async (data: {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   categoryId: string;
// }) => {
//   const { email, password, firstName, lastName, phoneNumber, categoryId } = data;

//   logger.info("Starting user registration process");

//   // Check if user already exists
//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     logger.warn(`Registration failed: Email ${email} is already in use`);
//     throw new AppError("Email is already in use", 400);
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   logger.debug("Password hashed successfully");

//   // Create user and profile
//   const newUser = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//       categoryId,
//       profile: {
//         create: {
//           firstName,
//           lastName,
//           phoneNumber,
//           skills: [], // Assuming skills is an empty array at registration
//         },
//       },
//     },
//   });

//   logger.info(`User created with email: ${newUser.email}`);

//   // Generate email verification link (placeholder for email function)
//   const verificationLink = `http://localhost:5173/verify-email/${newUser.id}`;
//   logger.debug(`Email verification link generated: ${verificationLink}`);
//   // TODO: Replace with actual email sending logic

//   return { message: "Registration successful. Please verify your email." };
// };

// // Verify Email
// export const verifyEmail = async (userId: string) => {
//   logger.info(`Starting email verification for user ID: ${userId}`);

//   const user = await prisma.user.findUnique({ where: { id: userId } });

//   if (!user) {
//     logger.warn(`Email verification failed: User ID ${userId} not found`);
//     throw new AppError("User not found", 404);
//   }

//   if (user.emailVerified) {
//     logger.info(`User ID ${userId} email is already verified`);
//     throw new AppError("Email is already verified", 400);
//   }

//   await prisma.user.update({
//     where: { id: userId },
//     data: { emailVerified: true, status: "VERIFIED" },
//   });

//   logger.info(`Email verified for user: ${user.email}`);
//   return { message: "Email verified successfully" };
// };

// // Login User
// export const loginUser = async (email: string, password: string) => {
//   logger.info(`User login attempt: ${email}`);

//   // Check if user exists
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     logger.warn(`Login failed: Email ${email} not found`);
//     throw new AppError("Invalid email or password", 401);
//   }

//   // Check if email is verified
//   if (!user.emailVerified) {
//     logger.warn(`Login failed: Email ${email} not verified`);
//     throw new AppError("Please verify your email to log in", 403);
//   }

//   // Compare passwords
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     logger.warn(`Login failed: Incorrect password for email ${email}`);
//     throw new AppError("Invalid email or password", 401);
//   }

//   // Generate token
//   const token = generateToken(user.id, user.role);

//   logger.info(`User logged in: ${user.email}`);
//   return { token, role: user.role };
// };

// // Change Password
// export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
//   logger.info(`Password change attempt for user ID: ${userId}`);

//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   if (!user) {
//     logger.warn(`Password change failed: User ID ${userId} not found`);
//     throw new AppError("User not found", 404);
//   }

//   // Compare old password
//   const isMatch = await bcrypt.compare(oldPassword, user.password);
//   if (!isMatch) {
//     logger.warn(`Password change failed: Incorrect old password for user ID ${userId}`);
//     throw new AppError("Incorrect old password", 400);
//   }

//   // Hash new password
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   logger.debug("New password hashed successfully");

//   // Update password
//   await prisma.user.update({
//     where: { id: userId },
//     data: { password: hashedPassword },
//   });

//   logger.info(`Password changed successfully for user: ${user.email}`);
//   return { message: "Password changed successfully" };
// };
import prisma from "../config/db.config";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.config";
import { AppError } from "../middlewares/error.middleware";
import logger from "../config/logger.config";

// Define user roles to match Prisma schema
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Login User with Role-Based Authentication
export const loginUser = async (email: string, password: string) => {
  logger.info(`User login attempt: ${email}`);

  // Check if user exists with profile information
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: {
      profile: true // Include profile to get additional user details if needed
    }
  });

  // Validate user existence
  if (!user) {
    logger.warn(`Login failed: Email ${email} not found`);
    throw new AppError("Invalid email or password", 401);
  }

  // Check if email is verified
  if (!user.emailVerified) {
    logger.warn(`Login failed: Email ${email} not verified`);
    throw new AppError("Please verify your email to log in", 403);
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.warn(`Login failed: Incorrect password for email ${email}`);
    throw new AppError("Invalid email or password", 401);
  }

  // Generate token with user ID and role
  const token = generateToken(user.id, user.role);

  logger.info(`User logged in: ${user.email} with role: ${user.role}`);
  
  // Return token, role, and additional user info
  return { 
    token, 
    role: user.role,
    userId: user.id,
    email: user.email,
    profile: user.profile
  };
};

// Helper function to get user by email (for reusability)
export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ 
    where: { email },
    include: {
      profile: true
    }
  });
};

// Function to get user roles (useful for role-based access control)
export const getUserRoles = () => {
  return Object.values(Role);
};

// Middleware for role-based authorization
export const checkUserRole = (requiredRoles: Role[]) => {
  return async (userId: string) => {
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: { role: true }
    });

    if (!user || !requiredRoles.includes(user.role as Role)) {
      logger.warn(`Role check failed for user ID: ${userId}`);
      throw new AppError("Unauthorized access", 403);
    }

    return true;
  };
};

// Additional utility functions can be added here as needed