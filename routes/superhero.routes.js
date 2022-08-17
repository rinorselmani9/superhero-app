const { json } = require('express')
const express = require('express')
const router = express.Router()
const superheroController = require('../controllers/superhero.controllers')
const { jsonResponse } = require('../lib/helper')
const { verifyToken } = require('../middlewares/auth.middleware')


router.post('/', verifyToken ,async(req,res) => {
    try{
        const result = await superheroController.add(req.body)
        res.json(jsonResponse(result))
    }catch(error){
        res.json(jsonResponse(error.message,false))
    }
    
})

module.exports = router