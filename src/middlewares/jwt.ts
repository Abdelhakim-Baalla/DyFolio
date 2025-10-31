import jwt from 'jsonwebtoken';

export default function jwtSimple(req: any, _res: any, next: any) {
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
        const payload = jwt.verify(token, secret);
        req.utilisateur = payload;
    } catch (err) {
        req.utilisateur = undefined;
    }

    // 6) continuer
    return next();
}
