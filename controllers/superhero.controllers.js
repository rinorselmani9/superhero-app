const superheroService =  require('../services/superhero.services')

module.exports = {
    add: async(params) => {
        const result = await superheroService.insert(params)
        return result
    }
}