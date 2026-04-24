const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// KEY
const key = process.env.ENCRYPTION_KEY;

if (!key) {
  throw new Error("ENCRYPTION_KEY missing from .env");
}

// Must be 32 bytes for aes-256
const keyBuffer = crypto
  .createHash("sha256")
  .update(String(key))
  .digest();

const iv = Buffer.alloc(16, 0); // static IV (simple fix for dev)

// ENCRYPT
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);

  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

// DECRYPT
const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);

  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};

module.exports = { encrypt, decrypt };