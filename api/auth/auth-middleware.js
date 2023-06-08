const User = require('../users/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HASH_ROUND, JWT_SECRET } = require('../../config/config');
const redis = require('redis');
const client = redis.createClient();


async function connection (){
    await client.connect();;
}
connection();

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
    req.body.password = bcrypt.hashSync(req.body.password, Number(HASH_ROUND));
    next();
}

const passwordCheck = async (req,res,next)=> {
    if(bcrypt.compareSync(req.body.password, req.user.password)){
        next();
    } else {
        next({status:401, message: "Invalid credentials!.."})
    }
    
}

const generateToken = async (req,res,next)=> {
    try {
        const { user } = req;
        const payload = {
            userId: user.id,
            roleName: user.roleName,
            name: user.firstName
        }
        const options = {
            expiresIn: "3h"
        }
        const token = jwt.sign(payload, JWT_SECRET, options);
        req.user.token = token;
        await client.set(token, 1, {EX: 60*60*3});  // redis'e cache'e attık.  3 saat cache'de kalacak şekilde ayarladık.
        next();
    } catch (err) {
        next(err);
    }
}

const restricted = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(token){
            const tokenValue = await client.get(token);  //ilk olarak redis cache'de var mı diye kontrol ettik.
            if(tokenValue) {
                jwt.verify(token, JWT_SECRET, (err, decodedJWT)=>{
                    if(!err){
                        req.decodedUser = decodedJWT;
                        next();
                    } else {
                        next(err);
                    }
                })
            } else {
                next({status:403, message: "Token is expired!..."})
            }
           
        } else {
            next({status:400, message: "Token is required!..."})
        }
    } catch (err) {
        next(err);
    }
}

const logout = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(token){
            const tokenValue = await client.get(token);
            if(tokenValue) {
                await client.del(token);
                next();
            } else {
                next({status:403, message: "Token is already expired!..."})
            }
           
        } else {
            next({status:403, message: "Token is required to log out!..."})
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    isEmailExist,
    hashPassword,
    passwordCheck,
    generateToken,
    restricted,
    logout,
}