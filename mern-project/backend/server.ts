const cors = require('cors');
import 'dotenv/config';
import RecipeRoutes from './src/routes/recipes';
import UserRoutes from './src/routes/users';
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use('/api/recipes', RecipeRoutes);
app.use('/api/users', UserRoutes);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
        console.log("App is listening on localhost:" + process.env.PORT);
    });
});
