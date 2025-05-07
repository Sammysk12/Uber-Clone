const http = require('http');

const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const server = http.createServer(app);

const cors = require('cors');

const PORT = process.env.PORT||3000;

app.use(cors());

server.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})