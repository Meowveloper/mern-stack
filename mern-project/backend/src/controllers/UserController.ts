import { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import User , { IUser } from "../models/User";
import { setHTTPOnlyToken } from "../helpers/generateToken";
const UserController = {
    me : ( req : Request, res : Response) => {
        return res.status(200).send({
            data : req.user, 
            msg : 'logged in !!'
        });

    }, 
    login: (req: Request, res: Response) => {
        User.login(req.body.email, req.body.password).then((user : IUser) => {
            const token = setHTTPOnlyToken(user._id, res);
            return res.status(200).send({
                msg : "Successfully login", 
                data : user, 
                token
            }); 
        }).catch(e => {
            return res.status(500).send({
                msg : "Error Login !!", 
                error : e instanceof Error ? e.message : "Unknown error"
            })
        })
    },

    register: async (req: Request, res: Response) => {
        try {
            const user = await User.register(req.body.name, req.body.email, req.body.password);
            const token = setHTTPOnlyToken(user._id, res);
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
    
    logout : async (req : Request, res : Response) => {
        res.cookie("token", '', { maxAge: 1 });
        return res.status(200).send({ msg : 'Loggedout' });
    }
};
export default UserController;
