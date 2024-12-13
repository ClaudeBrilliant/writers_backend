import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config";

/**
 * Register a new user
 */
export const registerUser = async (req: Request, res: Response) => {
  const { email, password , fullName, categoryId , phoneNumber} = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with default `INACTIVE` status
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER", // Default role
        status: "PENDING", // Default account status
        fullName,
        categoryId,
        phoneNumber
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Login user
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get the authenticated user's details
 */
export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, assignedTasks: true, transactions: true, category: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
