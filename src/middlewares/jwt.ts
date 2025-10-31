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

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        req.utilisateur = undefined;
        return next();
    }

    try {
        const payload = jwt.verify(token, secret);
        req.utilisateur = payload;
    } catch (err) {
        req.utilisateur = undefined;
    }

    // 6) continuer
    return next();
}
