import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date }
})

const Products = mongoose.model('Products', productSchema);

export default Products;