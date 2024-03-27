import axios from 'axios';

const apiKey = (lat, lon) => 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=af494e602866b5ff00ccf447bbdaf847'

const getLocation = async (lat, lon) => {

    let response = await axios.get(apiKey(lat, lon))

    return {...response.data, 'source' : 'API' }

}

const lat = '44.34'
const lon = '10.99'
let weather = await getLocation(apiKey)
console.log(weather)