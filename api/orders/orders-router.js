const router = require('express').Router();
const Order = require('./orders-model');


router.post('/', async (req,res,next)=>{
    try {
        const payload = req.body;
        payload.order.user_id = req.decodedUser.userId;
        const newOrder = await Order.create(payload);
        res.json(newOrder);
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{

    try {
        const order = await Order.getById(req.params.id);
        res.json(order);
    } catch (err) {
        next(err)
    }

})

module.exports = router;