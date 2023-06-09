//1. importlar
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const orderRouter = require('./orders/orders-router');
const { restricted } = require('./auth/auth-middleware');


//2. global middleware'lar
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());


//3. router'larımız
server.get('/', (req,res)=> {
    res.send('Server up and running...')
})
server.use('/api/users', restricted, userRouter);
server.use('/api/orders', restricted, orderRouter);
server.use('/api/auth', authRouter);

//4. Error middleware

server.use((err,req,res,next)=>{
    res.status(err.status || 500)
        .json({
            message: err.message || "Server Error!..."
        })
})



//5. export
module.exports = server;