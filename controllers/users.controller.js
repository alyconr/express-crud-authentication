const User = require('../models/users.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

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


   
        
