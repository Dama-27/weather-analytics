import { getCityCodes } from "../services/city.service";
import { getWeatherByCityCode } from "../services/weather.service";
import { Request, Response } from "express";

export async function getWeather(_request:Request, response:Response): Promise<void> {
    const cityCodes = await getCityCodes();
    const weatherResults = await Promise.all(
        cityCodes.map((cityCode) =>
        getWeatherByCityCode(cityCode))
    );

    response.json({data: weatherResults});
}