import { Router } from "express";
import { createProducts, deleteProduct, fetchProducts, updateProducts } from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";

const productRouter = Router();

productRouter.get('/', auth, fetchProducts);
productRouter.post('/', auth, createProducts);
productRouter.put('/', auth, updateProducts);
productRouter.delete('/', deleteProduct);

export default productRouter;