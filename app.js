require("dotenv").config();
const mongoose = require("mongoose");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");

const app = express();

//Configs
require("./config/db.config");


//Middlewares

app.use(morgan("dev"));
app.use(express.json());

//Routes

const routes = require("./config/routes.config");
app.use("/" , routes);




//Error Handler

app.use((error, req, res, next) => {
   
    if (error instanceof mongoose.Error.ValidationError) {
        error = createError(400, error.message);
    }
    console.error(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

    
   

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
