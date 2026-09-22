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
    "comfortIndex": number,
    "rank": number,
    "weatherData": WeatherData,
}