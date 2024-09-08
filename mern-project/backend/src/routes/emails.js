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
exports.EnumViewFiles = void 0;
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendEmail_1 = __importDefault(require("../helpers/sendEmail"));
var EnumViewFiles;
(function (EnumViewFiles) {
    EnumViewFiles["Email"] = "email";
})(EnumViewFiles || (exports.EnumViewFiles = EnumViewFiles = {}));
router.get("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sendEmail_1.default)({ viewFile: EnumViewFiles.Email, data: { name: "Aung", recipe: { title: "hello" } }, from: "aung aung", to: "aungaung@gmail.com", subject: "HELLO" });
        return res.send("email already sent");
    }
    catch (e) {
        return res.status(500).send({ msg: "error sending email" });
    }
}));
exports.default = router;
