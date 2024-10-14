import { verifyJWTToken } from "../utils/jwt.js";

export const auth = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    console.log('token received', authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: `Unauthorized: No token provided.`});
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyJWTToken(token);
    if(!decoded){
        return res.status(401).json({ message: 'Unauthorized: Invalid token'});
    }

    req.user = decoded;
    next();
}