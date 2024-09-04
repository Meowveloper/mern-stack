import { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import User, { IUser } from "../models/User";
import generateToken from "../helpers/generateToken";
const bcrypt = require("bcrypt");
const UserController = {
    login: (req: Request, res: Response) => {
        res.send({ msg: "Login Api Hit" });
    },

    register: async (req: Request, res: Response) => {
        try {
            const user = await User.register(req.body.name, req.body.email, req.body.password);
            const token = generateToken(user._id);
            res.cookie('token', token);
            return res.status(200).send({
                msg: "Successfully registered",
                data: user, 
                token
            });
        } catch (e) {
            if (e instanceof MongoServerError && e.code === 11000) {
                return res.status(400).send({
                    msg: "Email already exists",
                    error: e.errmsg,
                    keyValue: e.keyValue,
                });
            } else {
                return res.status(500).send({
                    msg: "An error occurred",
                    error: e instanceof Error ? e.message : "Unknown error",
                });
            }
        }
    },
};
export default UserController;
