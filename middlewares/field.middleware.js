const { check, validationResult } = require('express-validator');
const { jsonResponse } = require('../lib/helper')

const emailCheck = [
  check('email','Email is required').notEmpty(),  
  check('email','Email is not valid').isEmail()
]

const passwordCheck = [
  check('password','Password is required').notEmpty(),
  check('password','Password must be 6 characters long').isLength({min:6}),
  check('password','Password must contain a number and a character').matches(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{6,}$/),
]


const validators = {
  login: [...emailCheck,check('password','Password is required').notEmpty()],
  register:[
    check('firstName','First Name is required').notEmpty(),
    check('lastName','Last Name is requireied').notEmpty(),
    ...emailCheck,
    ...passwordCheck,
    check('age','Age must be a number').isNumeric()
  ],

  email:emailCheck,
  password:passwordCheck,
  
  validate: (req,res,next) => {
    const { errors } = validationResult(req)
    if(!errors.length){
      return next()
    }
    res.json(jsonResponse(erros,false))
  }

}

module.exports = validators