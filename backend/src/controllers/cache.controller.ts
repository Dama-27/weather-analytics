import { Request, Response } from "express";
import { clearCache, getCacheStatistics } from "../services/cache.service";

export function getCachedStatus(_request: Request, response: Response): void {
    response.json({ cache: getCacheStatistics() });
}

export function handleClearCache(_request: Request, response: Response): void {
    clearCache();
    response.json({ message: "Cache cleared successfully" });
}