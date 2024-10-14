import { verifyJWTToken } from "../utils/jwt.js";
import User from "../models/User.js"; 

export const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyJWTToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        if (user.blacklistedTokens.includes(token)) {
            return res.status(403).json({ message: 'Unauthorized: Token has been revoked' });
        }

        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error('Error during token verification:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
