import bcrypt from 'bcryptjs';
import User from "../models/User.js";
import { 
    generateJWTToken, 
    generateJWTRefreshToken, 
    verifyJWTToken 
} from '../utils/jwt.js'
import { handleError } from '../utils/helper.js';

export const createUser = async(req, res) =>{
    try {
        const { name, email, password, phone } = req.body;

        if(!email || !name || !password){
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if(existingUser){
            if(existingUser.email === email){
                return res.status(409).json({ message: 'Email already exists' });
            }
            if(existingUser.phone === phone){
                return res.status(409).json({ message: 'Phone number already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phone });
        
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch(error){
        handleError(error, res)
    }
};

export const userLogin = async(req, res)=>{
    const { email, password } = req.body;
    try {
        if(!email, !password){
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }

        const user = await User.findOne({ email }).exec();
        if(user && user.verifyPassword(password)){
            const userId = user._id.toString();
            const token = generateJWTToken(userId);
            const refreshToken = generateJWTRefreshToken(userId);
            return res.status(200).json({ success: true, message: "user login success!", token, refreshToken });
        }else{
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        handleError(error, res);
    }
}

export const refreshToken = async(req, res)=>{
    const { refreshToken } = req.body;
    try {
        if(!refreshToken) return res.status(401).send('Refresh token required');

        const user = verifyJWTToken(refreshToken);
        if(!user) return res.status(403).send('Invalid refresh token');

        const newToken = generateJWTToken(user.id);
        const newRefreshToken = generateJWTToken(user.id);

        res.status(200).json({ message: 'Successfully regenerated token', token: newToken, refreshToken: newRefreshToken})
    } catch (error) {
        handleError(error, res)
    }
}

export const userLogout = async(req, res)=>{
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        const decoded = verifyJWTToken(refreshToken);
        if (!decoded) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        await User.updateOne(
            { _id: decoded.id },
            { $addToSet: { blacklistedTokens: refreshToken } } 
        );

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        handleError(error, res);
    }
}