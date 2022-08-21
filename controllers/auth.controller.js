const userService = require('../services/user.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailService = require('../services/email.services')

module.exports = {
    login: async(params) => {
        const{ email,password } = params
        const regexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!email){
            throw Error ('Email is required!')
        }

        if(!password){
            throw Error ('Password is required!')
        }

        if(!regexPattern.test(email)){
            throw Error ('Email is not valid!')
        }

        const user = await userService.findByEmail(email)

        if(!user){
            throw Error('User does not exist!')
        }

        if (!user.verified) {
            throw Error('User is not verified!')
        }

        const hashedPassword = await bcrypt.compare(password, user.password)

        if(!hashedPassword){
            throw Error ('Password is incorrect!')
        }

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRETKEY)
        return token

    },
    forgotPassword: async(params) => {
        const { email } = params

        const user = await userService.findByEmail(email)

        if(!user){
            throw Error('Email does not exist!')
        }

        const token = jwt.sign({_id:user._id,exp:Math.floor(Date.now()/1000)+60*60*12},process.env.JWT_FORGOT_PASSWORD_SECRET)

        return await emailService.sendForgotPasswordEmail(email,token)
    }
    
}   