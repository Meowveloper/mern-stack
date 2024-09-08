const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
import "dotenv/config";
import RecipeRoutes from "./src/routes/recipes";
import UserRoutes from "./src/routes/users";
import EmailRoutes from "./src/routes/emails";
import authMiddleware from "./src/middleware/authMiddleware";
const cron = require("node-cron");
// ---------------------------------------------------------------

const app = express(); // initial creation of the app

app.use(express.static("public")); // serving files in the public files to static

app.use(express.json()); // making the app use json format

app.use(morgan("dev")); // just for the logs

app.use(
    cors({
        origin: process.env.FRONT_END_ORIGIN,
        credentials: true,
    })
); // to prevent cors errors

app.use(cookieParser()); // to manage cookies

app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/api/recipes", authMiddleware, RecipeRoutes); // recipes routes

app.use("/api/users", UserRoutes); // user routes
app.use(EmailRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
        console.log("App is listening on localhost:" + process.env.PORT);
        cron.schedule("* * * * *", () => {
            console.log("running a task every minute");
        });
    });
});
