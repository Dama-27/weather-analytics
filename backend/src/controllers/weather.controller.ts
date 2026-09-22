import { getCityCodes } from "../services/city.service";
import { createRankedWeatherResults } from "../services/weather-analytics.service";
import { getWeatherByCityCode } from "../services/weather.service";
import { Request, Response } from "express";

export async function getWeather(_request: Request, response: Response): Promise<void> {
    try {
        const cityCodes = await getCityCodes();
        const results = await Promise.all(
            cityCodes.map((cityCode) => getWeatherByCityCode(cityCode))
        );

        const rankedResults = createRankedWeatherResults(results)

        response.json({ data: rankedResults });
    } catch (error) {
        console.error('Failed to retrieve weather data', error);

        response.status(500).json({
            error: 'Failed to retrieve weather data',
        });
    }
}