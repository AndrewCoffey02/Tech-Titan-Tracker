//importing tools
import axios from 'axios'
import { Redis } from 'ioredis'

const redis = new Redis("rediss://default:9105239db83042b1b00a4d3d6f8011e5@eu1-becoming-kite-39003.upstash.io:39003");

//call the apikey with authorisation
const apiKey = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=af494e602866b5ff00ccf447bbdaf847`

//get location with longitude and latitude
const getLocation = async (city) => {

    let cacheEntry = await redis.get(`weather : ${city}`) 
    
    //if we have a cache hit
    if(cacheEntry) {

        cacheEntry = JSON.parse(cacheEntry)
        //return that entry
        return {...cacheEntry, 'source' : 'cache'}
    }

    //if we have a miss

    // call response with axios
    let response = await axios.get(apiKey(city))
    redis.set(`weather : ${city}`, JSON.stringify(response.data))
    //return response
    return {...response.data, 'source' : 'API' }

}

const city = 'Galway'
const t0 = new Date().getTime()
let weather = await getLocation(city)
const t1 = new Date().getTime()
weather.responseTime = `${t1-t0}ms`

console.log(weather)
process.exit()