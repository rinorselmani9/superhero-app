const userModel = require('../models/user.model')

module.exports = {
    insert: async(values) => {
        const result = await userModel.create(values)
        return result
    },
    findByEmail: async(email) => {
        const result = await userModel.findOne({email}).exec()
        return result
    }
}