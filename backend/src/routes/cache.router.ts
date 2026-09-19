import { Router } from "express"
import { getCachedStatus, handleClearCache } from "../controllers/cache.controller";

const cacheRouter = Router()

cacheRouter.get('/cache/status', getCachedStatus);
cacheRouter.delete('/cache', handleClearCache)

export default cacheRouter;