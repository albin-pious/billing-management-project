import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true, },
    createdAt: { type: Date },
    blacklistedTokens: { type: [String], default: [] },
});

UserSchema.methods.verifyPassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

export default User;