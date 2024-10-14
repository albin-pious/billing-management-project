import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname } from "path";

export const handleError = (error, res) => {
    console.error('Error:', error);
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: 'Validation Error', details: error.errors });
    } else if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: 'Invalid ID format' });
    } else {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getDirname = (metaUrl) => {
    return dirname(fileURLToPath(metaUrl));
};