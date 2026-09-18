import express from 'express';
import weatherRouter from './routes/weather.routes';


const app = express();

app.get("/health", (_request, response) => {
    response.json({
        status: "ok"
    });
});

app.use("/api", weatherRouter)

export default app;
