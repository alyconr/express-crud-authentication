const  mongoose = require('mongoose');
const MongoServer = require('mongodb-memory-server').MongoMemoryServer;

MongoServer.create().then((mongoServer) => {

    mongoose.connect(mongoServer.getUri(), {
        dbName: "express-crud-authentication"
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log("Error connecting to MongoDB", err);
    });
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
    });
});

