import { Router } from "express";
import authRouter from './auth.js'
import productRouter from "./products.js";
import billRouter from './bill.js';

const router = Router();

// authentication routes
router.use('/auth', authRouter);

// product routes
router.use('/products', productRouter);

// bill routes
router.use('/bill', billRouter)

export default router;