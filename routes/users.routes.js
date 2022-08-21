const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { jsonResponse } = require('../lib/helper')
const { verifyForgotPasswordToken,verifyRegisterToken } = require('../middlewares/auth.middleware')
const{ password,validate } = require('../middlewares/field.middleware')

/* GET users listing. */
router.get('/', (req, res) => {
  res.json(jsonResponse('ok'))
})

router.put('/forgot-password',verifyForgotPasswordToken, password, validate,async(req,res) => {
  try{
    const response = await userController.changePassword(req.body.password, req.decoded)
    res.json(jsonResponse(response))
  }catch(error){
    res.status(500).json(jsonResponse(error.message,false))
  }
})

router.put('/verify',verifyRegisterToken,async(req,res) => {
  try {
    const response = await userController.verifyAccount(req.decoded)
    res.json(jsonResponse(response))
  } catch (error) {
    res.status(500).json(jsonResponse(error.message,false))
  }
})



module.exports = router;
