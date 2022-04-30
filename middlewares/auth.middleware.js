const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports.checkAuth = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    try {
        const decodedToken = jwt.verify(token, process.env.SUPER_SECRET);
        req.userId = decodedToken.userId;
    } catch (err) {
        return next(createError(401, 'Invalid token'));
    }
    next();
};



            
    


   