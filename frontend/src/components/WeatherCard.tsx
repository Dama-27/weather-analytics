import type { WeatherResult } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherResult;
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <article className="weather-card">
      <div className="weather-card-header">
        <div>
          <span className="rank">#{weather.rank}</span>
          <h2>{weather.city || 'N/A'}</h2>
        </div>

        <div className="comfort-score">
          {weather.comfortScore != null ? weather.comfortScore : 'N/A'}
        </div>
      </div>

      <p>{weather.description || 'N/A'}</p>

      <div className="weather-details">
        <div>
          <span>Temperature</span>
          <strong>{weather.temperature != null ? `${weather.temperature}°C` : 'N/A'}</strong>
        </div>

        <div>
          <span>Feels Like</span>
          <strong>{weather.feelsLike != null ? `${weather.feelsLike}°C` : 'N/A'}</strong>
        </div>

        <div>
          <span>Humidity</span>
          <strong>{weather.humidity != null ? `${weather.humidity}%` : 'N/A'}</strong>
        </div>

        <div>
          <span>Wind</span>
          <strong>{weather.windSpeed != null ? `${weather.windSpeed} m/s` : 'N/A'}</strong>
        </div>

        <div>
          <span>Rain Past 1h</span>
          <strong>{weather.rain != null ? `${weather.rain} mm` : 'N/A'}</strong>
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;