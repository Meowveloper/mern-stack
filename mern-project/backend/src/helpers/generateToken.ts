const jwt = require('jsonwebtoken');
import 'dotenv/config';
import { ObjectId } from 'mongoose';
export default function generateToken (_id : ObjectId) : string {
    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const secretKey = process.env.TOKEN_SECRET_KEY;
    return jwt.sign({_id}, secretKey, { expiresIn : maxAge });
}