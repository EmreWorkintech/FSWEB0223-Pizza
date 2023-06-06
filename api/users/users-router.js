const router = require('express').Router();
const User = require('./users-model');
const { payloadCheck, isIdExist } = require('./users-middleware');


router.get('/', async (req,res,next)=>{
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        next(err)
    }
})

router.get('/:id', isIdExist, async (req,res,next)=>{
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        res.json(user);
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', isIdExist, async (req,res,next)=>{
    try {
        const { id } = req.params;
        const count = await User.remove(id);
        if(count){
            res.json({message: `${id}'li kullanıcı silindi.`})
        } else {
            res.status(404).json({message: `HATA: ${id} id'li kullanıcı silinemedi!...`})
        }
        
    } catch (err) {
        next(err)
    }
})

router.put('/:id', payloadCheck, isIdExist, async (req,res,next)=>{
    try {
        const { id } = req.params;
        const payload = req.body;
        const count = await User.update(id, payload);
        if(count){
            res.json({message: `${id}'li kullanıcı güncellendi.`})
        } else {
            res.status(404).json({message: `HATA: ${id} id'li kullanıcı güncellenemedi!...`})
        }
    } catch (err) {
        next(err)
    }
})


module.exports = router;