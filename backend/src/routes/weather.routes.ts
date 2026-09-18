import { Router } from "express";
import { getWeather } from "../controllers/weather.controller";

const weatherRouter = Router()

weatherRouter.get("/weather", getWeather)

export default weatherRouter