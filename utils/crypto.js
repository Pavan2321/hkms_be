const CryptoJS = require('crypto-js');

const secretKey = '0ff13223ec3eb90a2d494a38802c640553d899acbc6cfa34a687c803bc4e1f07';

if (!secretKey) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

// Encrypt
exports.encrypt = (plaintext) => {
  return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
}

// Decrypt
exports.decrypt = (encrypted) => {
  return CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
}