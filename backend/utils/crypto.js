const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// must be 32 bytes
const key = Buffer.from(process.env.ENCRYPTION_KEY, "utf-8");

if (!key || key.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be 32 bytes");
}

const ivLength = 16;

// ENCRYPT
const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

// DECRYPT
const decrypt = (data) => {
  const [ivHex, encryptedText] = data.split(":");

  if (!ivHex || !encryptedText) {
    throw new Error("Invalid encrypted format");
  }

  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};

module.exports = { encrypt, decrypt };