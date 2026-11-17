
import crypto from 'crypto';
import fs from 'fs';

// Encrypt using public key
function encryptMessage(message) {

    const publicKey = fs.readFileSync('./encryption/public_key.pem', 'utf8');

    const encrypted = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        Buffer.from(message)
    );

    return encrypted.toString('base64');
}


// Decrypt using private key
function decryptMessage(encryptedMessage) {

    const privateKey = fs.readFileSync('./encryption/private_key.pem', 'utf8');

    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        Buffer.from(encryptedMessage, 'base64')
    );

    return decrypted.toString('utf8');
}

export { encryptMessage, decryptMessage };
