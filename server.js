const http= require('http');
const app= require('./app');
const port = process.env.PORT || 9000;

const server = http.createServer();

server.listen(port,()=>{
    console.log("hi there!"+port);
});
