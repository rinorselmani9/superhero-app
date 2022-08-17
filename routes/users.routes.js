const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { jsonResponse } = require('../lib/helper')

/* GET users listing. */
router.get('/', (req, res) => {
  res.json(jsonResponse('ok'))
})

router.post('/',async(req,res) => {

  try {
    const result = await userController.add(req.body)
    res.json(jsonResponse(result))
  } catch (error) {
    res.json(jsonResponse(error.message,false))
  }

})

module.exports = router;
