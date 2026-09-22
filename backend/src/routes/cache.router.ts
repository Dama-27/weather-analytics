import { Router } from "express";
import { getCachedStatus, handleClearCache } from "../controllers/cache.controller";
import { validateAccessToken } from "../middleware/auth0.middleware";

const cacheRouter = Router();

cacheRouter.get('/cache/status', validateAccessToken, getCachedStatus);
cacheRouter.delete('/cache', validateAccessToken, handleClearCache);

export default cacheRouter;