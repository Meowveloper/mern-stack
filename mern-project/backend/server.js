"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
require("dotenv/config");
const recipes_1 = __importDefault(require("./src/routes/recipes"));
const users_1 = __importDefault(require("./src/routes/users"));
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use('/api/recipes', recipes_1.default);
app.use('/api/users', users_1.default);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
        console.log("App is listening on localhost:" + process.env.PORT);
    });
});
