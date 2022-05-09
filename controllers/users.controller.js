const User = require('../models/users.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {sendValidationEmail} = require('../config/nodemailer.config');

module.exports.list = (req, res, next) => {
    
        User.find()
            .then((users) => {
            res.status(200).json({
                message: 'Users  Listed',
                    users: users
            });
            })
            .catch(next);
    };

module.exports.create = (req, res, next) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    User.create(user) //create a new user
        .then((user) => {
            sendValidationEmail(user); //send a validation email
                        res.status(201).json({
                message: 'User created',
                user: user
            });
        }
        )
        .catch(next);
};

module.exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email
       
    })
        .then((user) => {
           if(user) {
               user.checkPassword( req.body.password)
                .then((match) => {
                    if(match) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        }, process.env.SUPER_SECRET, {
                            expiresIn: '1h',
                            
                        });

                        res.status(200).json({
                            acces_token: token,
                            message: 'User login',
                            user: user
                        });
                    } else {
                        throw createError(401, 'Invalid password');
                    }
                })
                .catch(next);
              } else {
                throw createError(401, 'Invalid email');
            }
        })
        .catch(next);
};


//logout module with a token

module.exports.logout = (req, res) => {
    const authHeader = req.headers.authorization; //get the token from the header
  if (authHeader) {
    const token = authHeader.split(' ')[1]; //split the token from the header
    jwt.verify(token, process.env.SUPER_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: 'Invalid token'
            });
        } else {
            res.status(200).json({
                message: 'Logout'
            });
        }
    }
    );
    } else {
        res.status(401).json({
            message: 'No token'
        });
    }
};









module.exports.loginGoogleCallback = (req, res, next) => { // this is the callback from the google login
    const token = jwt.sign ({ // create a token
        exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour
        sub: req.user.id 
    }, process.env.SUPER_SECRET);
    res.json ({
        access_token: token
    });
};
   
        
//validate the user

    module.exports.validate = (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, 
            { 
                validate: true
            }, )
            .then((user) => {
                if (!user) {
                    throw createError(404, 'User not found');
                }
                res.status(200).json({
                    message: 'User validated',
                    
                });
            })
            .catch(next);
    };
    module.exports.delete = (req, res, next) => {
        User.findByIdAndDelete(req.params.id)

            .then((user) => {
                if (!user) {
                    throw createError(404, 'User not found');
                }
                res.status(200).json({
                    message: 'User deleted',
                    user: user
                });
            }
            )
            .catch(next);
    };
    module.exports.update = (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

            .then((user) => {
                if (!user) {
                    throw createError(404, 'User not found');
                }
                res.status(200).json({
                    message: 'User updated',
                    user: user
                });
            }
            )
            .catch(next);
    };
   



            
