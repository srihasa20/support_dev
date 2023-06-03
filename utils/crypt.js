const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = class Crypt {
    async encrypt(password) {
        return bcrypt.hash(password, saltRounds)
    }
}