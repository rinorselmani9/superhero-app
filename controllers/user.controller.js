const userService = require('../services/user.service')
const bcrypt = require('bcrypt')

module.exports = {
    add: async(params) => {

        const { password } = params

        const hashedPassword = await bcrypt.hash(password,parseInt(process.env.GEN_SALT))
        params.password = hashedPassword

        const result = await userService.insert(params)
        return result
    }
}