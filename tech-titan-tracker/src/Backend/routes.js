 const express = require('express')
 const redis = require('redis')
 const axios = require('axios')
 const app = express()
 const port = 4000
 const Search = 'AAPL'

 const RedisClient = redis.createClient({
    url: "rediss://default:9105239db83042b1b00a4d3d6f8011e5@eu1-becoming-kite-39003.upstash.io:39003"

 })
 RedisClient.connect()

 const endPointKey = ({
    //maybe make the endpoint options (income statement) a template literal??
    url: `https://real-time-finance-data.p.rapidapi.com/company-income-statement`,
    params: {
      symbol: `AAPL`,
      period: 'QUARTERLY'
    },
    headers: {
      'X-RapidAPI-Key': '6612968778mshdc7b0e1fe333d44p147994jsne94ba23b6238',
      'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
    }
  });

app.get("/api", async (req, res) => {

    try{
        let cacheEntry = await RedisClient.get(`${Search}`) 
    
    //if we have a cache hit, it will select the key
    if(cacheEntry) {
        //parse the string object to JSON format
        cacheEntry = JSON.parse(cacheEntry)

        //return that entry
        return res.json(cacheEntry)
    }

    //if we have a miss
    RedisClient.set(`${Search}`, JSON.stringify(endPointKey))
    //return response
    return res.json(endPointKey)
    }
    catch (error) {
        console.log(error)
    }
})

 app.listen(port, () => {
    console.log(`App listening to port ${port}`)
 })