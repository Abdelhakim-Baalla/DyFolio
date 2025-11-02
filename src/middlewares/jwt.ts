import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function jwtMiddleware(req: any, _res: any, next: any) {
    const auth = req.headers && (req.headers.authorization || req.headers.Authorization);

    if (!auth) {
        req.utilisateur = undefined;
        return next();
    }

    const parts = auth.split(' ');
    const scheme = parts[0];
    const token = parts[1];

    if (!scheme || scheme !== 'Bearer' || !token) {
        req.utilisateur = undefined;
        return next();
    }

    const secret = process.env.JWT_SECRET || 'dev_secret';

    try {
        const payload = jwt.verify(token, secret) as any;
        req.utilisateur = payload;
        req.user = payload;
    } catch (err) {
        req.utilisateur = undefined;
        req.user = undefined;
    }

    return next();
}
