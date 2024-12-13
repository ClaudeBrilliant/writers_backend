import { Router } from "express";
import { registerUser,  loginUser, getAuthenticatedUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { registerSchema, loginSchema, changePasswordSchema } from "../validations/auth.validator";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/register", 
    validate(registerSchema), 
    registerUser
);

router.post(
    "/login", 
    validate(loginSchema), 
    loginUser
);

router.get(
    "/me", 
    authenticateJWT, getAuthenticatedUser);

export default router;
