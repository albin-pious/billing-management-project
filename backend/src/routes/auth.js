import { Router } from "express";
import { createUser, refreshToken, userLogin } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register', createUser);
authRouter.post('/login', userLogin);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;