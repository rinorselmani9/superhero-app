const express = require('express')
const { jsonResponse } = require('../lib/helper')
const router = express.Router()
const authController = require('../controllers/auth.controller')

/* GET home page. */
router.get('/', (req, res) => {
    res.json(jsonResponse('ok'))
})

router.post('/login', async(req,res) => {
  try {
      const result = await authController.login(req.body)
      res.json(jsonResponse(result))
  } catch (error) {
      res.json(jsonResponse(error.message,false))
  }
})


module.exports = router;
