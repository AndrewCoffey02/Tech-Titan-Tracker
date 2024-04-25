// Imports 
const express = require('express')
const redis = require('redis')
const rateLimit = require('express-rate-limit')
const axios = require('axios')
const app = express()
const port = 4000
var Search = ''

// Limits the amount of api calls
const limiter = rateLimit({
  windowMs: 2 * 1000, // limit every 15 seconds
  max: 10 // limit each ip to 100 requests 
})

// Declare rate limit
app.use(limiter)

// Add Cors to the server
const cors = require('cors')
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Redis client database
const RedisClient = redis.createClient({
  url: "rediss://default:9105239db83042b1b00a4d3d6f8011e5@eu1-becoming-kite-39003.upstash.io:39003"

})
// Connect to redis server platform
RedisClient.connect()

// Request for each company stock code
app.get(`/api/AMZN`, async (req, res) => { 
  
  Search = 'AMZN' // AMAZON
  await sendRequestKey(res)
})

app.get(`/api/MSFT`, async (req, res) => {
  
  Search = 'MSFT' // MICROSOFT
  await sendRequestKey(res)
})

app.get(`/api/GOOGL`, async (req, res) => {
  
  Search = 'GOOGL' // GOOGLE
  await sendRequestKey(res)
})

app.get(`/api/META`, async (req, res) => {
  
  Search = 'META' // META
  await sendRequestKey(res)
})

app.get(`/api/AAPL`, async (req, res) => {
  
  Search = 'AAPL' //APPLE
  await sendRequestKey(res)
})

// Api request url and parameters
const endPointKey = (Search) => ({
  url: `https://real-time-finance-data.p.rapidapi.com/company-income-statement`,
  params: {
    symbol: `${Search}:NASDAQ`,
    period: 'ANNUAL'
  },
  headers: {
    'X-RapidAPI-Key': '6612968778mshdc7b0e1fe333d44p147994jsne94ba23b6238',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
})

// Method to request api with redis caching
const sendRequestKey = async (res) => {

  try {
    let cacheEntry = await RedisClient.get(`${Search}`) 

    // If we have a cache hit, it will select the key
    if (cacheEntry) {
      //parse the string object to JSON format
      cacheEntry = JSON.parse(cacheEntry)

      // Return that entry
      return res.json(cacheEntry)
    }

    // If we have a cache miss, request using axios
    let response = await axios.request(endPointKey(Search))
    RedisClient.set(`${Search}`, JSON.stringify(response.data))
    // Return response
    return res.json(endPointKey)
  }
  catch (error) {
    console.log(error)
  }
}


app.listen(port, () => {
  console.log(`App listening to port ${port}`)
})