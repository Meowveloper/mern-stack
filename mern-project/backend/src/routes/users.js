"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const express_validator_1 = require("express-validator");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const handleErrorMessage_1 = __importDefault(require("../middleware/handleErrorMessage"));
const userRegisterValidationArray = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required and must have at least 8 characters')
];
router.post('/login', UserController_1.default.login);
router.post('/register', userRegisterValidationArray, handleErrorMessage_1.default, UserController_1.default.register);
exports.default = router;
