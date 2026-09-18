import 'dotenv/config';
import process from 'process';

const port = Number(process.env.PORT ?? 3000);
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

if(!openWeatherApiKey){
    throw new Error("OPENWEATHER_API_KEY is not configured.")
}

export const env = {
    port,
    openWeatherApiKey
}