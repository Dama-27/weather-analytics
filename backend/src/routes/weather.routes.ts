import { Router } from 'express';
import { getWeather } from '../controllers/weather.controller';
import { validateAccessToken } from '../middleware/auth0.middleware';

const weatherRouter = Router();

weatherRouter.get('/weather', validateAccessToken, getWeather);

export default weatherRouter;