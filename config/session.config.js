const expressSession = require('express-session');

const session = expressSession({
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure : process.env.SESSION_SECURE === 'true',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
});

module.exports = session;
