import { Request, Response } from 'express';
import 'dotenv/config';
const express = require('express');

const app = express();


app.listen(process.env.PORT, () => {
    console.log("App is listening on localhost:" + process.env.PORT);
})