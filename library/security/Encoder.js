const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const algorithm = 'aes-256-ctr';
const password = '_Steven_Huang_';

exports.AESEncrypt = function(text) {
    try {
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text,'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    } catch(err) {
        return '';
    }
}
 
exports.AESDecrypt = function(text) {
    try {
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    } catch(err) {
        return '';
    }
}

exports.MD5Encrypt = function(text) {
	return crypto.createHash('md5').update(text).digest("hex");
}

exports.RSADecrypt = function(text) {
    try {
        var absolutePath = path.resolve('library/security/RSAPrivateKey.txt');
        var privateKey = fs.readFileSync(absolutePath, "utf8");
        var buffer = new Buffer.from(text, "base64");
        return crypto.privateDecrypt({"key": privateKey, padding: crypto.constants.RSA_PKCS1_PADDING}, buffer).toString("utf8");
    } catch(err) {
        return '';
    }
}