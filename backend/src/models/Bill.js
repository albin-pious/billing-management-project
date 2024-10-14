import mongoose from "mongoose";

const billSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    pdfPath: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Bill = mongoose.model('Bill', billSchema);

export default Bill;