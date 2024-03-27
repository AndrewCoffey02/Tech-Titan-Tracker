//import tools
const express = require('express')
const redis = require('redis')

//declare methods for calling queries
const app = express()

//decide what port number the database is using
const port = 4000

//add Cors to the server
const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//call the client access
const Client = redis.createClient({
    url: 'redis://localhost:6379'
});

//connect to redis database
Client.on('connect', () => {
    console.log('Connected to redis server succcesfully');
});

Client.on('error', (error) => {
    console.error('Redis client encountered an error:', error);
});
//wait for client to connect
(async () => {
    await Client.connect();
})();

app.get('/', (req, res) => {
    res.send("<h1>Redis server is ready!</h1>")
})

//request the port for database to listen
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

