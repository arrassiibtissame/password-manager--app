//this the database connection file, we will use mongoose to connect to our MongoDB database. We will export the connectDB function so that we can use it in our server.js file to connect to the database before starting the server.

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/password_manager");

        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;