export interface WeatherData {
    "cityCode": number,
    "cityName": string,
    "weather": Array<{"description" :string}>,
    "main": {
        "temp": number,
        "feels_like": number,
        "pressure": number,
        "humidity": number
    },
    "visibility": number,
    "wind": {
        "speed": number
    }
    "clouds": {
        "all": number
    },
    "rain"?: {
        "1h"?: number
    }
}

export interface RankedWeatherData {
    "comfortIndex": number,
    "rank": number,
    "weatherData": WeatherData,
}