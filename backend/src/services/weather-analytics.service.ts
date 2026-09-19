import { calculateComfortIndex } from "../services/comfort-index.service";
import { WeatherData, RankedWeatherData } from "../types/weather.types";
import { ANALYTICS_CACHE_KEY } from "../utils/cache-keys";
import { getCached, setCached } from "./cache.service";

const RANKED_WEATHER_CACHE_TTL_SECONDS = 300;

export function createRankedWeatherResults(weatherData: WeatherData[]):RankedWeatherData[] {

    const cached = getCached<RankedWeatherData[]>(ANALYTICS_CACHE_KEY)

    if(cached){
        console.log('[Cache] HIT processed analytics');
        return cached;
    }

    console.log('[Cache] MISS processed analytics');

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

    setCached(ANALYTICS_CACHE_KEY, rankedResults, RANKED_WEATHER_CACHE_TTL_SECONDS);

    return rankedResults;
}