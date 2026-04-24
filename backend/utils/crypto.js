const crypto = require("crypto");

const algorithm = "aes-256-cbc";

//  use plain string (NOT hex)
const key = Buffer.from(process.env.ENCRYPTION_KEY, "utf8");
// static IV for now (later we improve it)
const iv = Buffer.alloc(16, 0);

//  ENCRYPT
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

//  DECRYPT
const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};

module.exports = { encrypt, decrypt };