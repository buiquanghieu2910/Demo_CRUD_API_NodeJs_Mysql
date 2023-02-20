const bcrypt = require("bcrypt")
const saltRounds = 10
module.exports = {
    hasPasword: async function (password) {
        let salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(password, salt);
    },
    checkPassword: async function (password, hash) {
        return await bcrypt.compare(password, hash);
    }
}
