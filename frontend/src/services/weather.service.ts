import type { WeatherResult } from '../types/weather';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export interface WeatherData {
  id?: number;
  name?: string;
  cityCode?: number;
  cityName?: string;
  weather: Array<{ description: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    '1h'?: number;
  };
}

export interface RankedWeatherData {
  comfortIndex: number;
  rank: number;
  weatherData: WeatherData;
}

function toCelsius(kelvinOrCelsius: number | undefined | null): number | null {
  if (kelvinOrCelsius == null || isNaN(kelvinOrCelsius)) {
    return null;
  }

  const celsius = kelvinOrCelsius > 150 ? kelvinOrCelsius - 273.15 : kelvinOrCelsius;
  return Math.round(celsius * 10) / 10;
}

function normalizeWeatherItem(item: RankedWeatherData, index: number): WeatherResult {
  const wd = item.weatherData;

  const city = wd?.name || wd?.cityName || 'N/A';
  const description = wd?.weather?.[0]?.description || 'N/A';

  const temperature = toCelsius(wd?.main?.temp);
  const feelsLike = toCelsius(wd?.main?.feels_like);

  const humidity = wd?.main?.humidity != null && !isNaN(wd.main.humidity)
    ? Math.round(wd.main.humidity)
    : null;

  const windSpeed = wd?.wind?.speed != null && !isNaN(wd.wind.speed)
    ? Math.round(wd.wind.speed * 10) / 10
    : null;

  const rain = wd?.rain?.['1h'] != null && !isNaN(wd.rain['1h'])
    ? Math.round(wd.rain['1h'] * 10) / 10
    : null;

  const comfortScore = item.comfortIndex != null && !isNaN(item.comfortIndex)
    ? Math.round(item.comfortIndex)
    : null;

  const rank = item.rank ?? index + 1;

  return {
    rank,
    comfortScore,
    description,
    city,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    rain,
  };
}

export async function getWeatherData(accessToken?: string): Promise<WeatherResult[]> {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_URL}/weather`, { headers });

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const result = await response.json();
  const rawList: RankedWeatherData[] = Array.isArray(result?.data)
    ? result.data
    : Array.isArray(result)
    ? result
    : [];

  return rawList.map((item, index) => normalizeWeatherItem(item, index));
}