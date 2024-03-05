const express = require('express')
const redis = require('redis')

const app = express()
const port = 4000

const Client = redis.createClient({
    url: 'redis://localhost:6379'
});

Client.on('connect', () => {
    console.log('Connected to redis server succcesfully');
});

Client.on('error', (error) => {
    console.error('Redis client encountered an error:', error);
});
  
(async () => {
    await Client.connect();
})();

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

