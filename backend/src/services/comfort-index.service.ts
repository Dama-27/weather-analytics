import {
    calculateFeelsLikeScore,
    calculateHumidityScore,
    calculateWindScore,
    calculateRainScore
} from "../common/normalize";
import { WeatherData } from "../types/weather.types";

export function calculateComfortIndex(weatherData: WeatherData): number {
    const feelsLikeCeliciusScore = calculateFeelsLikeScore(weatherData.main.feels_like - 273.15);
    const humidityScore = calculateHumidityScore(weatherData.main.humidity);
    const windSpeedScore = calculateWindScore(weatherData.wind.speed * 3.6);
    const rainScore = calculateRainScore(weatherData.rain?.["1h"] ?? 0);

    const comfortScore = feelsLikeCeliciusScore * 0.5 + humidityScore * 0.3 + windSpeedScore * 0.1 + rainScore * 0.1;
    return comfortScore;
}