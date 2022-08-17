module.exports = {
    jsonResponse: (data,succes = true) => {
        return{
            succes,
            data
        }
    }
}