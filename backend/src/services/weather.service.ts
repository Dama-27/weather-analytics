import { WeatherData } from "../types/weather.types";
import { env } from "../config/env";

export async function getWeatherByCityCode(cityCode:string): Promise<WeatherData> {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");

    url.searchParams.set('id', cityCode)
    url.searchParams.set('appid', env.openWeatherApiKey)

     const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
        `OpenWeatherMap request failed: ${response.status}`,
        );
    }

    return (await response.json()) as WeatherData;
    
}