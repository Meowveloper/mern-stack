import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import User from "../models/User";
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY!, (err: VerifyErrors | null, decodedValue: string | JwtPayload | undefined) => {
            if (err) {
                return res.status(401).json({ msg: "Not authenticated" });
            } else if (decodedValue && typeof decodedValue !== "string" && "_id" in decodedValue) {
                User.findById(decodedValue._id).then(user => {
                    if (user) req.user = user;
                    next();
                });
            }
        });
    } else {
        return res.status(400).json({ msg: "Not authenticated" });
    }
}
