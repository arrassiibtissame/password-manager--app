const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); 
const ivLength = 16;

// ENCRYPT
function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

// DECRYPT (SAFE VERSION)
function decrypt(data) {
  if (!data || typeof data !== "string") return "";

  try {
    const parts = data.split(":");
    if (parts.length !== 2) return "";

    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = parts[1];

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (err) {
    console.error("Decrypt error:", err.message);
    return ""; // prevent crash
  }
}

module.exports = { encrypt, decrypt };