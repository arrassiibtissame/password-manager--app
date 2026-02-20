const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Password Manager API running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});