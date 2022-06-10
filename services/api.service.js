import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js"
import axios from "axios";


const getCityCoordinates = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)

    if(!token) {
        throw new Error("Not found API TOKEN, Please add -t [API TOKEN]")
    }
    
    const urlCity = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${token}`
    
    const {data} = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            limit: 5,
            appid: token
        }
    })

    const coordinates = {
        lat: data[0].lat,
        lon: data[0].lon
    }

    return coordinates
}


const getWeather =  async (city) => {

    
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
    const coordinates = await getCityCoordinates(city)
    

    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            appid: token,
        }
    })

    return data
    
    
    

    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

    

    
}

getWeather("moscow")

export {getWeather}