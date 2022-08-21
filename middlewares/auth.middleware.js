const { jsonResponse } = require("../lib/helper")
const jwt = require('jsonwebtoken')

const verify = (secret,req,res,next) => {
    if(!req.headers.authorization){
        res.json(jsonResponse('Token is not present',false))
    }
    if(!req.headers.authorization.startsWith('Bearer ')){
        res.json(jsonResponse('Token is not a bearer token',false))
    }
    
    const token = req.headers.authorization.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token,secret)
        req.decoded = decoded._id
        next()
    } catch (error) {
        res.json(jsonResponse(error.message,false))
    }
}


module.exports = {

    verifyToken:(req,res,next) => {
        verify(process.env.JWT_SECRETKEY, req,res,next)
    },

    verifyForgotPasswordToken: (req,res,next) => {
        verify(process.env.JWT_FORGOT_PASSWORD_SECRET,req,res,next)
    },
    verifyRegisterToken:(req,res,next) => {
        verify(process.env.JWT_VERIFY_SECRET,req,res,next)
    }
}