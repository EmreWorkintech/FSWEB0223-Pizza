const User = require('../users/users-model');
const bcrypt = require('bcryptjs');
const { HASH_ROUND } = require('../../config/config');

const isEmailExist = async (req,res,next)=> {
    const { email } = req.body;
    const users = await User.getByFilter({"email": email});
    if(users.length == 0) {
        next({status:401, message: "Invalid credentials!.."})
    } else {
        req.user= users[0];
        next();
    }
}

const hashPassword = async (req,res,next)=> {
    req.body.password = bcrypt.hashSync(req.body.password, HASH_ROUND);
    next();
}

const passwordCheck = async (req,res,next)=> {
    if(bcrypt.compareSync(req.body.password, req.user.password)){
        next();
    } else {
        next({status:401, message: "Invalid credentials!.."})
    }
    
}

module.exports = {
    isEmailExist,
    hashPassword,
    passwordCheck
}