import { WeatherData } from "../types/weather.types";
import { env } from "../config/env";
import { getCached, setCached } from "./cache.service";
import { weatherCacheKey } from "../utils/cache-keys";

const WEATHER_CACHE_TTL_SECONDS = 300;

export async function getWeatherByCityCode(cityCode:string): Promise<WeatherData> {
    const cacheKey = weatherCacheKey(cityCode)
    const cachedWeather = getCached<WeatherData>(cacheKey)

    if(cachedWeather){
        console.log(`[Cache] HIT ${cacheKey}`);
        return cachedWeather;
    }

    console.log(`[Cache] MISS ${cacheKey}`);
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");

    url.searchParams.set('id', cityCode)
    url.searchParams.set('appid', env.openWeatherApiKey)

     const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
        `OpenWeatherMap request failed: ${response.status}`,
        );
    }

    const weather = (await response.json()) as WeatherData;
    
    setCached(cacheKey, weather, WEATHER_CACHE_TTL_SECONDS);

    return weather;
}