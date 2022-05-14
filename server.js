const http = require('http')
const fd = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    // console.log(req, res);

    

    res.setHeader('Content-Type', 'text/html');

    res.write('hello youuuuu!!!');
 
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('server running on port 3000');
}) 