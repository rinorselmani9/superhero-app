const superheroModel = require('../models/superhero.model')

module.exports = {
    insert : async(values) => {
        const result = await superheroModel.create(values)
        return result
    } 
}