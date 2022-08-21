const mongoose = require ('mongoose');
const userController = require('../controllers/user.controller');

module.exports = {
    connect: () => {
        mongoose.connect(process.env.DB_URL,()=>{
            console.log('Connected to db');
            userController.checkForAdmin()
        })
    }
}