const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){
    const authHeader = req.headers["Authorization"];
    if (!authHeader){
        return res.status (401).json({message:"No token,access denied"});

    }
    try {
        const token = authHeader.replace("Bearer","");
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();}
        catch (err){
            res.status(401).json({message:"Invalid token"});

        }};
