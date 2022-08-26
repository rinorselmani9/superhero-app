const express = require('express')
const { jsonResponse } = require('../lib/helper')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const fieldMiddleware = require('../middlewares/field.middleware')
const userController = require('../controllers/user.controller')
const { name, version} = require('../package.json')

/* GET home page. */
router.get('/', (req, res) => {
    
    const data = {
        name,
        version
    }
    res.json(jsonResponse(data))
})

router.post('/login',fieldMiddleware.login,fieldMiddleware.validate, async(req,res) => {
  try {
      const result = await authController.login(req.body)
      res.json(jsonResponse(result))
  } catch (error) {
      res.json(jsonResponse(error.message,false))
  }
})

router.post('/register',fieldMiddleware.register,fieldMiddleware.validate,async(req,res) => {
    try {
        const result = await userController.add(req.body)
        res.json(jsonResponse(result))
    } catch (error) {
        res.json(jsonResponse(error.message,false))
    }
})

router.post('/forgot-password-request',fieldMiddleware.email,fieldMiddleware.validate,async(req,res) => {
    try {
        const result = await authController.forgotPassword(req.body)
        res.json(jsonResponse(result))
    } catch (error) {
        res.json(jsonResponse(error.message,false))
    }
})


module.exports = router;
