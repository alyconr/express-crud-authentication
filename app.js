require("dotenv").config();
const mongoose = require("mongoose");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");

const app = express();

//Configs
require("./config/db.config");
require("./config/passport.config");
const session = require("./config/session.config");



//Middlewares

app.use(session);
app.use(morgan("dev"));
app.use(express.json());

//Routes

const routes = require("./config/routes.config");
app.use("/" , routes);




//Error Handler

app.use((error, req, res, next) => {
   
    if (error instanceof mongoose.Error.ValidationError) {
       
        if (error.errors.email) {
            res.status(400).json({
                message: error.errors.email.message
            });
        } else if (error.errors.password) {
            res.status(400).json({
                message: error.errors.password.message
            });
        } else if (error.errors.name) {
            res.status(400).json({
                message: error.errors.name.message
            });
        } 

        
            
    }
    console.error(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: "Mail already exists, try another one"
        }
    });
});

    
   

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
