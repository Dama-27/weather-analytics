# Fidenz Weather Analytics

A weather analytics application developed as part of the Fidenz Training Software Engineer assignment.

It collects weather data for selected cities, calculates a human **Comfort Index** (how pleasant the weather feels), and ranks cities from most comfortable to least comfortable.

---

## What We've Built So Far

Here is what the backend currently does under the hood:

1. **City List Loading**: Reads a list of cities and city codes from `data/cities.json`.
2. **Live Weather Fetching**: Connects to the OpenWeatherMap API to fetch live temperatures, humidity, wind, and rain.
3. **In-Memory Caching**: Uses `node-cache` with a 5-minute TTL (time-to-live) to keep responses fast and prevent redundant external API calls.
4. **Comfort Index Scoring**: Analyzes each city's conditions and produces a score from `0` to `100` based on:
   - **Feels-like temperature (50%)**
   - **Relative humidity (30%)**
   - **Wind speed (10%)**
   - **Rainfall (10%)**
5. **City Ranking**: Automatically sorts cities by their comfort index and assigns ranks (Rank 1 = best weather).
6. **Automated Unit Tests**: Includes tests powered by `vitest` to verify that the scoring math works accurately.

---

## API Endpoints

Once the server is running, you can access these routes:

`GET` `/health` - Check if the server is up and running
`GET` `/api/weather` - Returns all cities with live weather, comfort scores, and rankings
`GET` `/api/comfort` - Returns individual city comfort index calculations
`GET` `/api/cache/status` - Shows cache statistics (cache hits, misses, total requests)
`DELETE` `/api/cache` - Clears all cached weather data and resets stats

---

## Getting Started

### 1. Set Up Environment Variables
Inside the `backend/` directory, create a `.env` file (or copy from `.env.example`):

```env
PORT=3000
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The server will start listening at `http://localhost:3000`.

### 4. Run Unit Tests
```bash
npm test
```