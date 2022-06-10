#!/usr/bin/env node

// MYTOKEN: b853873926f27744a597533d638ef808

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js"
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
    console.log(1)
    // Проверка токена
    if(!token.length) {
        printError("NO TOKEN")
    } else {
        try { 
            await saveKeyValue(TOKEN_DICTIONARY.token, token)
            printSuccess('Token save')
        } catch (err) {
            printError(err.message)
        }
    }
}


const saveCity = async (city) => {
    // Проверка токена
    if(!city.length) {
        printError("NO CITY")
    } else {
        try { 
            await saveKeyValue(TOKEN_DICTIONARY.city, city)
            printSuccess('City save')
        } catch (err) {
            printError(err.message)
        }
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)

        printWeather(weather)
    } catch (err) {
        if (err?.response?.status == 404) {
            printError("No city")
        } else if (err?.response?.status == 401) {
            printError("No token")
        } else {
            printError(err.message)
        }
    }
    
}


const initCLI = () => {
    // Сбор флагов
    const args = getArgs(process.argv)
    
    // Обработка флагов
    if(args.h) { //Хелпер
        printHelp()
    }
    if(args.c) { //Сохранение города
        return saveCity(args.c)
    }
    if(args.t) { //Сохранение токена
        return saveToken(args.t)
    }

    getForecast()

};

initCLI();