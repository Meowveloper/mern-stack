const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
import { Request, Response } from "express";
import sendEmail from "../helpers/sendEmail";
export enum EnumViewFiles {
    Email = "email",
}
router.get("/send-email", async (req: Request, res: Response) => {
    try {
        await sendEmail({ viewFile: EnumViewFiles.Email, data: { name: "Aung", recipe: { title: "hello" } }, from: "aung aung", to: "aungaung@gmail.com", subject: "HELLO" });
        return res.send("email already sent");
    } catch (e) {
        return res.status(500).send({ msg: "error sending email" });
    }
});

export default router;
