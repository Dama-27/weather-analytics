import { Router } from "express"
import { getCachedStatus } from "../controllers/cache.controller";

const cacheRouter = Router()

cacheRouter.get('/cache/status', getCachedStatus);

export default cacheRouter;