"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateToken;
const jwt = require('jsonwebtoken');
require("dotenv/config");
function generateToken(_id) {
    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const secretKey = process.env.TOKEN_SECRET_KEY;
    return jwt.sign({ _id }, secretKey, { expiresIn: maxAge });
}
