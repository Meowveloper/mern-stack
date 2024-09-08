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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendEmail;
const nodemailer = require("nodemailer");
const ejs = require("ejs");
function sendEmail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ viewFile, data, from, to, subject }) {
        try {
            var transport = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
            const dataString = yield ejs.renderFile(__dirname + "/../../views/" + viewFile + ".ejs", data);
            const info = yield transport.sendMail({
                from,
                to,
                subject,
                html: dataString,
            });
        }
        catch (e) {
            console.log('email error', e);
            throw new Error('error sending email');
        }
    });
}
