const crypto = require ("crypto");
const algorithm = "aes-256-cbc";
//32 characters key 
const secretKey = process.env.SECRET_KEY ;
// 16 characters IV 
const iv = Buffer.alloc(16,0);
function encrypt(text){
    const cipher = crypto.createCipheriv(algorithm,secretKey,iv);
    let encrypted = cipher.update(text,"utf8","hex");
    encrypted += cipher.final("hex");
    return encrypted;
}
function decrypt(text){
    const decipher = crypto.createDecipheriv(algorithm,secretKey,iv);
    let decrypted = decipher.update(text,"hex","utf8");
    decrypted += decipher.final("utf8");
    return decrypted;

}
module.exports = {encrypt,decrypt};