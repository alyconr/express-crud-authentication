const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/users.model');

module.exports.checkAuth = async (req, res, next) => {

    const authHeader = req.headers.authorization; //get the token from the header
    const token = authHeader && authHeader.split(' ')[1]; //split the token from the header
    
    try {
        const decodedToken = jwt.verify(token, process.env.SUPER_SECRET); //verify the token
        req.userId = decodedToken.userId;//get the userId from the token

        const user = await User.findById(req.userId); //find the user by the userId

        if (user && user.validate) { //if the user is valid
            req.user = user; //set the user to the request
            next(); //go to the next middleware
        } else {
            throw createError(401, 'Unauthenticated');
        }
    } catch (error) {
        next(error);
    }
};



    
        
   


            
    


   