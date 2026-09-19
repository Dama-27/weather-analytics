import { Request, Response } from "express";
import { getCacheStatistics } from "../services/cache.service";

export function getCachedStatus(_request: Request, response: Response): void {
    response.json({ cache: getCacheStatistics() });
}