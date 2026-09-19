import { getCityCodes } from "../services/city.service";
import { calculateComfortIndex } from "../services/comfort-index.service";
import { getWeatherByCityCode } from "../services/weather.service";
import { Request, Response } from "express";

export async function getWeather(_request: Request, response: Response): Promise<void> {
    try {
        const cityCodes = await getCityCodes();
        const results = await Promise.all(
            cityCodes.map(async (cityCode) => {
                const weather = await getWeatherByCityCode(cityCode);
                const score = calculateComfortIndex({
                    feelsLike: weather.main.feels_like,
                    humidity: weather.main.humidity,
                    windSpeed: weather.wind.speed,
                    rain: weather.rain?.['1h'] ?? 0,
                });

                return {
                    cityCode,
                    cityName: weather.name,
                    comfortIndex: score,
                    weather: weather
                };
            })
        );

        results.sort((a, b) => b.comfortIndex - a.comfortIndex);
        const rankedResults = results.map((city, index) => ({
            rank: index + 1,
            ...city,
            }));

        response.json({ data: rankedResults });
    } catch (error) {
        console.error('Failed to retrieve comfort index:', error);

        response.status(500).json({
            error: 'Failed to retrieve comfort index',
        });
    }
}