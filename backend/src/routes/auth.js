import { Router } from "express";
import { createUser, refreshToken, userLogin, userLogout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register', createUser);
authRouter.post('/login', userLogin);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/logout', userLogout);

export default authRouter;