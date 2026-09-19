import {
    calculateFeelsLikeScore,
    calculateHumidityScore,
    calculateWindScore,
    calculateRainScore
} from "../common/normalize";
import { ComfortIndex } from "../types/comfort-index.type";

export function calculateComfortIndex(weather: ComfortIndex): number {
    const feelsLikeCeliciusScore = calculateFeelsLikeScore(weather.feelsLike - 273.15);
    const humidityScore = calculateHumidityScore(weather.humidity);
    const windSpeedScore = calculateWindScore(weather.windSpeed * 3.6);
    const rainScore = calculateRainScore(weather.rain);

    const comfortScore = feelsLikeCeliciusScore * 0.5 + humidityScore * 0.3 + windSpeedScore * 0.1 + rainScore * 0.1;
    return comfortScore;
}