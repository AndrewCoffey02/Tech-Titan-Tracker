const express = require('express')
const redis = require('redis')
const axios = require('axios')
const app = express()
const port = 4000
const Search = 'AAPL'

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

//redis client database
const RedisClient = redis.createClient({
  url: "rediss://default:9105239db83042b1b00a4d3d6f8011e5@eu1-becoming-kite-39003.upstash.io:39003"

})
RedisClient.connect()

const endPointKey = ({
  //maybe make the endpoint options (income statement) a template literal??
  url: `https://real-time-finance-data.p.rapidapi.com/company-income-statement`,
  params: {
    symbol: `AAPL:NASDAQ`,
    period: 'ANNUAL'
  },
  headers: {
    'X-RapidAPI-Key': '6612968778mshdc7b0e1fe333d44p147994jsne94ba23b6238',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
});

const sendRequestKey = async (res) => {

  try {
    let cacheEntry = await RedisClient.get(`${Search}`)

    //if we have a cache hit, it will select the key
    if (cacheEntry) {
      //parse the string object to JSON format
      cacheEntry = JSON.parse(cacheEntry)

      //return that entry
      return res.json(cacheEntry)
    }


    //if we have a miss
    let response = await axios.request(endPointKey)
    RedisClient.set(`${Search}`, JSON.stringify(response.data))
    //return response
    return res.json(endPointKey)
  }
  catch (error) {
    console.log(error)
  }
}

app.get("/api", async (req, res) => {

  await sendRequestKey(res)
})

app.listen(port, () => {
  console.log(`App listening to port ${port}`)
})