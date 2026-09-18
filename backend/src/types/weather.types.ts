export interface WeatherData {
    "id": number,
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
    }
}