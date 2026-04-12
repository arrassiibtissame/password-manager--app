const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){
    console.log("HEADERS:", req.headers);
    const authHeader = req.headers["Authorization"];
    if (!authHeader){
        return res.status (401).json({message:"No token,access denied"});

    }
    // Split "Bearer TOKEN"
    const token = authHeader.split (" ")[1];
    if (!token){
        return res.status (401).json({message:"No token,access denied"});

    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();}
        catch (err){
            res.status(401).json({message:"Invalid token"});

        }};
