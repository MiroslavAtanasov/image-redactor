const jwt = require('jsonwebtoken');
const config = require('../config/config')

function createToken(data) {
    return jwt.sign(data, config.development.privateKey, { expiresIn: '1w' })
}

function verifyToken(token) {
    return jwt.verify(token, config.development.privateKey)
}

module.exports = { createToken, verifyToken }