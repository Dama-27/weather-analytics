import type { WeatherResult } from '../types/weather';

interface WeatherTableProps {
  weather: WeatherResult[];
}

function WeatherTable({ weather }: WeatherTableProps) {
  return (
    <div className="table-container">
      <table className="weather-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>City</th>
            <th>Weather</th>
            <th>Temperature</th>
            <th>Feels Like</th>
            <th>Humidity</th>
            <th>Rain Past 1h</th>
            <th>Wind Speed</th>
            <th>Comfort Score</th>
          </tr>
        </thead>

        <tbody>
          {weather.map((item, index) => (
            <tr key={`${item.city}-${item.rank || index}`}>
              <td>{item.rank}</td>
              <td>{item.city || 'N/A'}</td>
              <td>{item.description || 'N/A'}</td>
              <td>{item.temperature != null ? `${item.temperature}°C` : 'N/A'}</td>
              <td>{item.feelsLike != null ? `${item.feelsLike}°C` : 'N/A'}</td>
              <td>{item.humidity != null ? `${item.humidity}%` : 'N/A'}</td>
              <td>{item.rain != null ? `${item.rain} mm` : 'N/A'}</td>
              <td>{item.windSpeed != null ? `${item.windSpeed} m/s` : 'N/A'}</td>
              <td>{item.comfortScore != null ? item.comfortScore : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherTable;