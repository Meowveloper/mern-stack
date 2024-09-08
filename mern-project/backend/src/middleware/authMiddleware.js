"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY, (err, decodedValue) => {
            if (err) {
                return res.status(401).json({ msg: "Not authenticated" });
            }
            else if (decodedValue && typeof decodedValue !== "string" && "_id" in decodedValue) {
                User_1.default.findById(decodedValue._id).then(user => {
                    if (user)
                        req.user = user;
                    next();
                });
            }
        });
    }
    else {
        return res.status(400).json({ msg: "Not authenticated" });
    }
}
