import chalk from 'chalk'
import dedent from "dedent-js"
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js"

const printError = (err) => {
    console.log(chalk.bgRed(" ERROR ")+ " " + err);
}

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + msg);
}

const printHelp = () => {
    console.log(
        dedent(chalk.bgCyan('HELP') + '\n' +
        'No parameters - print weather' + '\n' +
        '-h [HELP] - standart help' + '\n' +
        '-c [CITY] - setup city' + '\n' +
        '-t [API_KEY] - setup token'
    ))
}

const printWeather = async (weather) => {
    const city = await getKeyValue(TOKEN_DICTIONARY.city)
    console.log(`Weather in ${city}`)
    console.log(`Temp: ${weather.main.temp - 273}`)
    console.log(`Main: ${weather.weather[0].main}`)
    
    console.log(`Description: ${weather.weather[0].description}`)
    // console.log(weather.weather)
}


export {printError, printSuccess, printHelp,printWeather }