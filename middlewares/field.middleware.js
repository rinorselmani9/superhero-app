const { check, validationResult } = require('express-validator');
module.exports = {
  login: [check('email').exists()]
}