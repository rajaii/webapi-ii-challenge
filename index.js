const express = require('express');
const port = 5000;
 
const postsRouter = require('./posts/postsRouter');

const server = express();

server.get('/', (req, res) => {
    res.send('successful get!')
})

server.use('/api/posts', postsRouter);

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})