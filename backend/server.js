//Some imports 
//http to create an http server
const http = require('http');

const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT||3000;






server.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})