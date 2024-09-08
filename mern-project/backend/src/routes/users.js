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
const express = require('express');
const router = express.Router();
const express_validator_1 = require("express-validator");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const handleErrorMessage_1 = require("../middleware/handleErrorMessage");
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userRegisterValidationArray = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required'),
    (0, express_validator_1.body)('email').custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email: value });
        if (user) {
            throw new Error('user with this email already exists');
        }
    })),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required and must have at least 8 characters')
];
router.get('/me', authMiddleware_1.default, UserController_1.default.me);
router.post('/login', UserController_1.default.login);
router.post('/register', userRegisterValidationArray, handleErrorMessage_1.handleErrorMessage, UserController_1.default.register);
router.post('/logout', UserController_1.default.logout);
exports.default = router;
