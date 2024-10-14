import Products from "../models/Products.js";
import { handleError } from "../utils/helper.js";

export const createProducts = async(req, res)=>{
    const { name, price, quantity } = req.body;
    console.log(req.user._id);
    try {
        if(!name, !price, !quantity){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newProduct = new Products({
            name,
            price,
            quantity,
            createdBy: req.user.id,
            createdAt: new Date(),
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({message: "product created successfully", data: savedProduct});
    } catch (error) {
        handleError(error, res);
    }
}

export const fetchProducts = async(req, res)=>{
    try {
        const products = await Products.find();
        res.status(200).json({ message: "products fetched successfully", data: products })
    } catch (error) {
        handleError(error, res);
    }
}

export const updateProducts = async(req, res)=>{
    const productId = req.query.id;
    const { name, price, quantity } = req.body;
    try {
        if (!name && !price && !quantity) {
            return res.status(400).json({ message: 'No valid update fields provided' });
        }

        const updateProduct = await Products.findByIdAndUpdate(
            productId,
            { $set: {...req.body} },
            { new: true, runValidators: true }
        );
        if(!updateProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "product updated successfully", data: updateProduct });
    } catch (error) {
        handleError(error, res);
    }
}

export const deleteProduct = async(req, res)=>{
    const productId = req.query.id;
    try {
        const deletedProduct = await Products.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        handleError(error, res);
    }
}