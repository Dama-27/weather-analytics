import { useEffect, useMemo, useState } from 'react';
import { getWeatherData } from './services/weather.service';
import type { WeatherResult } from './types/weather';
import WeatherTable from './components/WeatherTable';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';

function App() {
  const [weather, setWeather] = useState<WeatherResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rank' | 'comfortScore' | 'temperature' | 'city'>('rank');

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await getWeatherData();

        setWeather(data);
      } catch {
        setError('Unable to load weather data.');
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  const sortedWeather = useMemo(() => {
    const data = [...weather];

    switch (sortBy) {
      case 'comfortScore':
        return data.sort(
          (a, b) => (b.comfortScore ?? -Infinity) - (a.comfortScore ?? -Infinity)
        );

      case 'temperature':
        return data.sort(
          (a, b) => (b.temperature ?? -Infinity) - (a.temperature ?? -Infinity)
        );

      case 'city':
        return data.sort((a, b) =>
          (a.city || '').localeCompare(b.city || '')
        );

      case 'rank':
      default:
        return data.sort((a, b) => a.rank - b.rank);
    }
  }, [weather, sortBy]);

  if (loading) {
    return (
      <main>
        <h1>Weather Analytics</h1>
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Weather Analytics</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Weather Analytics</h1>
      <p>Weather comfort analysis dashboard</p>

      {weather.length === 0 ? (
        <p>No weather data available.</p>
      ) : (
        <>
          <div className="controls">
            <label htmlFor="sort">
              Sort by:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as | 'rank' | 'comfortScore' | 'temperature' | 'city')
              }
            >
              <option value="rank">Rank</option>
              <option value="comfortScore">Comfort Score</option>
              <option value="temperature">Temperature</option>
              <option value="city">City Name</option>
            </select>
          </div>

          <div className="desktop-table">
            <WeatherTable weather={sortedWeather} />
          </div>

          <div className="mobile-cards">
            {sortedWeather.map((item, index) => (
              <WeatherCard
                key={`${item.city}-${item.rank || index}`}
                weather={item}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default App;