const express = require('express')
const redis = require('redis')

const app = express()
const port = 4000

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

//request what port for database to listen to 
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

