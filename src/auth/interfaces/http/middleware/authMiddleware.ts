import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log("LOG: authenticateJWT -> token", token);
    if (!token) {
        return res.status(401).json({ message: 'Access denied you do not have token' });
    }
    try {
        const secret = process.env.JWT_SECRET as string;
        console.log("LOG: authenticateJWT -> secret", secret);
        const decoded = jwt.verify(token, secret, { complete: true });
        console.log("LOG: authenticateJWT -> decoded", decoded);
        req.user = decoded;
        console.log("LOG: authenticateJWT -> req.user", req.user);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};