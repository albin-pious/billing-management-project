import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Products from '../models/Products.js';
import { handleError, getDirname } from '../utils/helper.js';
import Bill from '../models/Bill.js';
import User from '../models/User.js';

const __dirname = getDirname(import.meta.url);

export const createBill = async (req, res) => {
    const { products } = req.body;
    const userId = req.user.id;
    const createdBy = await User.findById(req.user.id).select('name');
    try {
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Invalid products array' });
        }

        let totalAmount = 0;
        const billProducts = [];

        for (const item of products) {
            const product = await Products.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient quantity for product: ${product.name}` });
            }

            const itemTotal = product.price * item.quantity;
            totalAmount += itemTotal;

            billProducts.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price
            });

            await Products.findByIdAndUpdate(product._id, {
                $inc: { quantity: -item.quantity }
            });
        }

        const newBill = new Bill({
            user: userId,
            products: billProducts.map(item => ({
                product: item.product,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount
        });
        
        const savedBill = await newBill.save();

        const pdfFileName = await generatePDF(savedBill, createdBy.name, billProducts);

        res.status(201).json({
            message: 'Bill created successfully',
            bill: {
                ...savedBill.toObject(),
                createdBy,
                products: billProducts
            },
            pdfUrl: `/bills/${pdfFileName}`
        });
    } catch (error) {
        handleError(error, res);
    }
};

async function generatePDF(bill, createdBy, detailedProducts) {
    return new Promise((resolve, reject) => {
        const billsDir = path.join(__dirname, '../bills');
        const pdfFileName = `bill_${bill._id}.pdf`;
        const pdfPath = path.join(billsDir, pdfFileName);

        if (!fs.existsSync(billsDir)) {
            fs.mkdirSync(billsDir, { recursive: true });
        }
        const writeStream = fs.createWriteStream(pdfPath);

        const doc = new PDFDocument();

        // doc font which support ₹ symbol
        doc.font(path.join(__dirname, "../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"))
        doc.pipe(writeStream);

        // Header
        doc.fontSize(20).text('Bill', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Bill ID: ${bill._id}`);
        doc.text(`Date: ${bill.createdAt.toLocaleDateString()}`);
        doc.text(`Created By: ${createdBy}`);
        doc.moveDown();

        // Table header
        const tableTop = 200;
        const tableLeft = 50;
        const columnWidth = 100;
        doc.fontSize(10);

        doc.text('Sl', tableLeft, tableTop);
        doc.text('Name', tableLeft + columnWidth, tableTop);
        doc.text('Price', tableLeft + columnWidth * 2, tableTop);
        doc.text('Quantity', tableLeft + columnWidth * 3, tableTop);
        doc.text('Sub Total', tableLeft + columnWidth * 4, tableTop);

        // Horizontal line
        doc.moveTo(tableLeft, tableTop + 20)
           .lineTo(tableLeft + columnWidth * 5, tableTop + 20)
           .stroke();

        // Table content
        let yPosition = tableTop + 40;
        detailedProducts.forEach((item, index) => {
            const subTotal = item.price * item.quantity;
            doc.text((index + 1).toString(), tableLeft, yPosition);
            doc.text(item.name, tableLeft + columnWidth, yPosition);
            doc.text(`₹${item.price.toFixed(2)}`, tableLeft + columnWidth * 2, yPosition);
            doc.text(item.quantity.toString(), tableLeft + columnWidth * 3, yPosition);
            doc.text(`₹${subTotal.toFixed(2)}`, tableLeft + columnWidth * 4, yPosition);
            yPosition += 20;
        });

        // Horizontal line
        doc.moveTo(tableLeft, yPosition)
           .lineTo(tableLeft + columnWidth * 5, yPosition)
           .stroke();

        // Total
        yPosition += 20;
        doc.fontSize(12).text(`Total Amount: ₹${bill.totalAmount.toFixed(2)}`, tableLeft + columnWidth * 3, yPosition);

        doc.end();

        writeStream.on('finish', () => resolve(pdfFileName));
        writeStream.on('error', reject);
    });
}