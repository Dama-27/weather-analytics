import 'dotenv/config';
import process from 'process';

const port = Number(process.env.PORT ?? 3000);
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE;

if (!openWeatherApiKey) {
  throw new Error('OPENWEATHER_API_KEY is not configured.');
}

if (!auth0Domain || !auth0Audience) {
  throw new Error('AUTH0_DOMAIN and AUTH0_AUDIENCE must be configured in backend/.env');
}

export const env = {
  port,
  openWeatherApiKey,
  auth0Domain,
  auth0Audience,
};