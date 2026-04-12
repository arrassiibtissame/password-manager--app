const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("=== AUTH MIDDLEWARE START ===");
  console.log("URL:", req.originalUrl);
  console.log("METHOD:", req.method);
  console.log("AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("❌ NO AUTH HEADER");
    return res.status(401).json({ message: "No token, access denied" });
  }

  const parts = authHeader.trim().split(" ");
  console.log("PARTS:", parts);

  const token = parts[1];

  if (!token) {
    console.log("❌ NO TOKEN AFTER SPLIT");
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    req.user = decoded;

    console.log("=== AUTH SUCCESS ===");
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};