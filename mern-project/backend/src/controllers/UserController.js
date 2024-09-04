"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../helpers/generateToken"));
const bcrypt = require("bcrypt");
const UserController = {
    login: (req, res) => {
        res.send({ msg: "Login Api Hit" });
    },
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.register(req.body.name, req.body.email, req.body.password);
            const token = (0, generateToken_1.default)(user._id);
            res.cookie('token', token);
            return res.status(200).send({
                msg: "Successfully registered",
                data: user,
                token
            });
        }
        catch (e) {
            if (e instanceof mongodb_1.MongoServerError && e.code === 11000) {
                return res.status(400).send({
                    msg: "Email already exists",
                    error: e.errmsg,
                    keyValue: e.keyValue,
                });
            }
            else {
                return res.status(500).send({
                    msg: "An error occurred",
                    error: e instanceof Error ? e.message : "Unknown error",
                });
            }
        }
    }),
};
exports.default = UserController;
