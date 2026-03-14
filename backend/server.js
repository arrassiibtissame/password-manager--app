const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import auth routes
const authRoutes = require("./routes/auth");

const app = express();

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // ✅ this is the key line

// Test route
app.get("/", (req, res) => {
    res.send("Password Manager API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));