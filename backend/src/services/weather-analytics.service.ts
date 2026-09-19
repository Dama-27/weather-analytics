import { getCityCodes } from "../services/city.service";
import { calculateComfortIndex } from "../services/comfort-index.service";
import { getWeatherByCityCode } from "../services/weather.service";
import { Request, Response } from "express";
import { WeatherData, WeatherDataResponse } from "../types/weather.types";

export function createRankedWeatherResults(weatherData: WeatherData[]):WeatherDataResponse[] {
    const results = weatherData.map((key) => {
        const score = calculateComfortIndex(key);
        return {
            comfortIndex: score,
            weatherData: key
            
        }
    })
                
    results.sort((a, b) => b.comfortIndex - a.comfortIndex);
    const rankedResults = results.map((key, index) => ({
        rank: index + 1,
        comfortIndex: key.comfortIndex,
        weatherData: key.weatherData
    }));

    return rankedResults;
}