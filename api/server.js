//1. importlar
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');


//2. global middleware'lar
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());


//3. router'larımız
server.get('/', (req,res)=> {
    res.send('Server up and running...')
})

//4. Error middleware




//5. export
module.exports = server;