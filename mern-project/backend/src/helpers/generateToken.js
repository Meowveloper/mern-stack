"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateToken;
exports.setHTTPOnlyToken = setHTTPOnlyToken;
const jwt = require("jsonwebtoken");
require("dotenv/config");
function generateToken(_id) {
    const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
    const secretKey = process.env.TOKEN_SECRET_KEY;
    return jwt.sign({ _id }, secretKey, { expiresIn: maxAge });
}
function setHTTPOnlyToken(_id, res) {
    const maxAgeForCookie = 3 * 24 * 60 * 60 * 1000; // 3 days in miliseconds
    const token = generateToken(_id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAgeForCookie });
    return token;
}
