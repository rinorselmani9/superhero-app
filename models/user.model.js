const mongoose = require('mongoose')
const constants = require('../lib/constants')

const userSchema = new mongoose.Schema(
    {
        firstName:{ type:String, required:true },
        lastName: { type:String, required:true },
        email:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true,
            match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill your email address"]
        },
        age:{ type:Number, min:1 },
        password:{ type:String, required:true },
        profilePicture:{ type:String },
        role:{ type:String, enum:Object.values(constants.role), required:true, default:constants.role.USER },
        verified:{ type:Boolean, default:false },
        favorites:[{ type: mongoose.Schema.Types.ObjectId, ref:'Superheroes'}], 
    },
    {
        timestamps:true
    }
)

userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
      return next(new Error('This email address already exist!'));
    } 
    next();
});

const userModel = mongoose.model('users',userSchema)

module.exports = userModel