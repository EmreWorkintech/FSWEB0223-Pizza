const router = require('express').Router();
const User = require('../users/users-model');
const { isEmailExist, hashPassword, passwordCheck, generateToken, logout } = require('./auth-middleware');
const { payloadCheck } = require('../users/users-middleware');
const { restricted } = require('./auth-middleware');



router.post('/register', payloadCheck, hashPassword, async (req,res,next)=>{
    try {
        const payload = req.body;
        const user = await User.create(payload);
        if (user) {
            res.json({message: `Merhaba ${user.firstName}...`})
        } else {
            next({status: 400, message: "Kayıt sırasında hata oluştu!.."})
        }
    } catch(err){
        next(err)
    }
})

router.post('/login', isEmailExist, passwordCheck, generateToken, async (req,res,next)=>{
    try {
        const user = req.user;
        const token = user.token;
        res.json({message: `Welcome back ${user.firstName}...`, token})

    } catch(err){
        next(err)
    }
})

router.get('/logout', restricted, logout, async (req,res,next)=>{
    try {
        const name = req.decodedUser.name;
        res.json({message: `Get back soon ${name}...`})

    } catch(err){
        next(err)
    }
})

router.get('/me', restricted, async (req,res,next)=>{
    try {
       const id = req.decodedUser.userId;
       const user = await User.getById(id);
       res.json(user);
    } catch(err){
        next(err)
    }
})

module.exports = router;