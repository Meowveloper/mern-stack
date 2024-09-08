import { Response } from "express";
const jwt = require("jsonwebtoken");
import "dotenv/config";
import { ObjectId } from "mongoose";
export default function generateToken(_id: ObjectId): string {
    const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
    const secretKey = process.env.TOKEN_SECRET_KEY;
    return jwt.sign({ _id }, secretKey, { expiresIn: maxAge });
}
export function setHTTPOnlyToken(_id: ObjectId, res: Response): string {
    const maxAgeForCookie = 3 * 24 * 60 * 60 * 1000; // 3 days in miliseconds
    const token = generateToken(_id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAgeForCookie });
    return token;
}
