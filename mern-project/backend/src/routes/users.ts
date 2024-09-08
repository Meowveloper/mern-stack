const express = require('express');
const router = express.Router();
import { body } from "express-validator";
import UserController from '../controllers/UserController';
import {handleErrorMessage} from "../middleware/handleErrorMessage";
import User, { IUser } from "../models/User";
import authMiddleware from "../middleware/authMiddleware";

const userRegisterValidationArray = [
    body('name').notEmpty().withMessage('Name is required'), 
    body('email').notEmpty().withMessage('Email is required'),
    body('email').custom(async (value : string) => {
        const user : IUser | null = await User.findOne({ email : value });
        if(user) {
            throw new Error('user with this email already exists');
        }
    }), 
    body('password').notEmpty().withMessage('Password is required and must have at least 8 characters')
];
router.get('/me', authMiddleware,  UserController.me);
router.post('/login', UserController.login);
router.post('/register',userRegisterValidationArray, handleErrorMessage , UserController.register);
router.post('/logout', UserController.logout);

export default router;