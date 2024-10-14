import { Router } from "express";
import { createBill } from "../controllers/billController.js";
import { auth } from "../middleware/auth.js";

const billRouter = Router();

billRouter.post('/', auth, createBill);

export default billRouter;