import crypto from 'crypto'
import fs from 'fs'

// 1. Generer nøgleparret
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
})

// 2. Gem nøglerne i to separate filer
fs.writeFileSync('public_key.pem', publicKey)
fs.writeFileSync('private_key.pem', privateKey)

console.log('Nøglerne er nu gemt i public_key.pem og private_key.pem!')