//1. importlar
const express = require('express');
const server = express();

//2. global middleware'lar
server.use(express.json());


//3. router'larımız
server.get('/', (req,res)=> {
    res.send('Server up and running...')
})

//4. Error middleware




//5. export
module.exports = server;