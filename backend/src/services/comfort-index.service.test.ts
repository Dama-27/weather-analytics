import { describe, expect, it } from 'vitest';
import { calculateComfortIndex } from './comfort-index.service';
import type { WeatherData } from '../types/weather.types';

function createMockWeather(value: {
  feelsLikeCelsius?: number;
  humidity?: number;
  windSpeedMs?: number;
  rainMm?: number;
}): WeatherData {
  const feelsLikeCelsius = value?.feelsLikeCelsius ?? 25;
  const humidity = value?.humidity ?? 50;                  
  const windSpeedMs = value?.windSpeedMs ?? 3;            
  const rainMm = value?.rainMm ?? 0;                       

  return {
    id: 1248991,
    name: 'Colombo',
    cityCode: 1248991,
    cityName: 'Colombo',
    weather: [{ description: 'clear sky' }],
    main: {
      temp: feelsLikeCelsius + 273.15,
      feels_like: feelsLikeCelsius + 273.15,
      humidity,
    },
    wind: {
      speed: windSpeedMs,
    },
    rain: rainMm > 0 ? { '1h': rainMm } : undefined,
  };
}

describe('calculateComfortIndex', () => {
  it('returns a high score for ideal conditions', () => {
    const mockData = createMockWeather({
      feelsLikeCelsius: 25,
      humidity: 50,
      windSpeedMs: 3,
      rainMm: 0,
    });

    const score = calculateComfortIndex(mockData);
    expect(score).toBe(100);
  });

  it('reduces the score for extreme temperature', () => {
    const mockData = createMockWeather({
      feelsLikeCelsius: 40,
      humidity: 50,
      windSpeedMs: 3,
      rainMm: 0,
    });

    const score = calculateComfortIndex(mockData);
    expect(score).toBeLessThan(100);
  });

  it('reduces the score for high humidity', () => {
    const mockData = createMockWeather({
      feelsLikeCelsius: 25,
      humidity: 95,
      windSpeedMs: 3,
      rainMm: 0,
    });

    const score = calculateComfortIndex(mockData);
    expect(score).toBeLessThan(100);
  });

  it('reduces the score for rain', () => {
    const mockData = createMockWeather({
      feelsLikeCelsius: 25,
      humidity: 50,
      windSpeedMs: 3,
      rainMm: 12,
    });

    const score = calculateComfortIndex(mockData);
    expect(score).toBeLessThan(100);
  });

  it('handles missing rain data gracefully', () => {
    const mockData = createMockWeather({
      feelsLikeCelsius: 25,
      humidity: 50,
      windSpeedMs: 3
    });

    const score = calculateComfortIndex(mockData);
    expect(score).toBe(100);
  });

  it('always returns a score between 0 and 100', () => {
    const extremeWeather = createMockWeather({
      feelsLikeCelsius: 50,
      humidity: 100,
      windSpeedMs: 20,
      rainMm: 50,
    });

    const score = calculateComfortIndex(extremeWeather);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
    expect(Number.isInteger(score)).toBe(true);
  });
});
