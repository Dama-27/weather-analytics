export interface WeatherResult {
  rank: number;
  comfortScore: number | null;
  description: string;
  city: string;
  temperature: number | null;
  feelsLike: number | null;
  humidity: number | null;
  windSpeed: number | null;
  rain?: number | null;
}