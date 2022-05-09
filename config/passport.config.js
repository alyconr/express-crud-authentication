const User = require('../models/users.model');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const mongoose = require('mongoose');

passport.serializeUser((user, next) => {
    next(null, user.id);
});

passport.deserializeUser((id, next) => {
    User.findById(id)
        .then((user) => {
            next(null, user);
        })
        .catch((err) => {
            next(err);
        });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/redirect/google",




},
(issuer, profile, next) => {
    User.findOne({
        "social.id" : profile.id,
        "social.provider" : issuer,

    })
        .then((user) => {   
            if(user) {
                next(null, user);
            } else {
                User.create({ //create a new user
                    name: profile.displayName, //get the display name from google
                    email: profile.emails[0].value, //get the email from google
                    password: new mongoose.Types.ObjectId(), //create a new password
                    social: { //create a new social object
                        id: profile.id, //get the id from google
                        provider: issuer, //get the issuer from google
                    }
                })
                    .then((user) => { 
                        next(null, user); 
                    })
                    .catch((err) => { 
                        next(err);
                    });

            }
        })
        .catch((err) => {
            next(err);
        });
}));

 module.exports = passport;