"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require('express');
const app = express();
app.listen(process.env.PORT, () => {
    console.log("App is listening on localhost:" + process.env.PORT);
});
