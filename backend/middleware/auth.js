const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){
    console.log("HEADERS:", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({message:"No token,access denied"});

    }
    // Split "Bearer TOKEN"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer"){
        return res.status(401).json({message:"Token format invalid"});
    }
    const token = parts[1];
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();}
        catch (err){
            res.status(401).json({message:"Invalid token"});

        }};
