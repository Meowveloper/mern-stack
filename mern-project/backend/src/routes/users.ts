const express = require('express');
const router = express.Router();
import { body } from "express-validator";
import UserController from '../controllers/UserController';
import handleErrorMessage from "../middleware/handleErrorMessage";
const userRegisterValidationArray = [
    body('name').notEmpty().withMessage('Name is required'), 
    body('email').notEmpty().withMessage('Email is required'), 
    body('password').notEmpty().withMessage('Password is required and must have at least 8 characters')
];

router.post('/login', UserController.login);
router.post('/register',userRegisterValidationArray, handleErrorMessage , UserController.register);

export default router;