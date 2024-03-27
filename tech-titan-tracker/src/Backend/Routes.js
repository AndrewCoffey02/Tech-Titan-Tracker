//importing tools
import axios from 'axios'
import { Redis } from 'ioredis'

//redis database from upstash
const redis = new Redis("rediss://default:9105239db83042b1b00a4d3d6f8011e5@eu1-becoming-kite-39003.upstash.io:39003");

//call the apikey with authorisation
const apiKey = {
  method: 'GET',
  url: 'https://real-time-finance-data.p.rapidapi.com/company-income-statement',
  params: {
    symbol: 'AAPL:NASDAQ',
    period: 'QUARTERLY',
    language: 'en'
  },
  headers: {
    'X-RapidAPI-Key': '6612968778mshdc7b0e1fe333d44p147994jsne94ba23b6238',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
};

//get location with longitude and latitude
const NASAAP = async () => {

    let cacheEntry = await redis.get('NASDAQ:AAPL') 
    
    //if we have a cache hit, it will select the key
    if(cacheEntry) {
        //parse the string object to JSON format
        cacheEntry = JSON.parse(cacheEntry)

        //return that entry
        return {...cacheEntry, 'source' : 'cache'}
    }

    //if we have a miss
    // call response with axios
    let response = await axios.request(apiKey)
    redis.set('NASDAQ:AAPL', JSON.stringify(response.data))
    //return response
    return {...response.data, 'source' : 'API' }

}

//parameters
const city = 'Galway'

//time and call the method 
const t0 = new Date().getTime()
let weather = await NASAAP()
const t1 = new Date().getTime()
weather.responseTime = `${t1-t0}ms`
console.log(weather)

//exit when implemented
process.exit()
