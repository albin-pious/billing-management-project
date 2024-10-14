import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const secret = config.jwtSecret;

if(!secret){
    throw new Error('JWT Secret environment variable is not defined');
}

function generateToken(userId, expiresIn) {
    return jwt.sign({ id: userId }, secret, { expiresIn });
}

export function generateJWTToken(userId) {
    return generateToken(userId, config.jwtExpiration);
}

export function generateJWTRefreshToken(userId) {
    return generateToken(userId, config.jwtRefreshExpiration);
}

export function verifyJWTToken(token){
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('error occured while verifying jwt token ', error);
        return null;
    }
}