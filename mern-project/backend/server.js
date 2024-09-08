"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv/config");
const recipes_1 = __importDefault(require("./src/routes/recipes"));
const users_1 = __importDefault(require("./src/routes/users"));
const emails_1 = __importDefault(require("./src/routes/emails"));
const authMiddleware_1 = __importDefault(require("./src/middleware/authMiddleware"));
const cron = require("node-cron");
// ---------------------------------------------------------------
const app = express(); // initial creation of the app
app.use(express.static("public")); // serving files in the public files to static
app.use(express.json()); // making the app use json format
app.use(morgan("dev")); // just for the logs
app.use(cors({
    origin: process.env.FRONT_END_ORIGIN,
    credentials: true,
})); // to prevent cors errors
app.use(cookieParser()); // to manage cookies
app.set('view engine', 'ejs');
app.set('views', './views');
app.use("/api/recipes", authMiddleware_1.default, recipes_1.default); // recipes routes
app.use("/api/users", users_1.default); // user routes
app.use(emails_1.default);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
        console.log("App is listening on localhost:" + process.env.PORT);
        cron.schedule("* * * * *", () => {
            console.log("running a task every minute");
        });
    });
});
