import NodeCache from "node-cache";
import { CachedStatistics } from "../types/cache.type";

const DEFAULT_TTL_SECONDS = 300;

const cache = new NodeCache({
  stdTTL: DEFAULT_TTL_SECONDS,
  checkperiod: 60,
});

const statistics: CachedStatistics = { hits:0, misses:0};

export function getCached<T>(key: string): T | undefined {
    const value = cache.get<T>(key);
    if(value != undefined){
        statistics.hits+=1;
    }
    else{
        statistics.misses+=1;
    }

    return value;
}

export function setCached<T>(key: string, value: T, ttlSeconds: number = DEFAULT_TTL_SECONDS,): void {
    cache.set(key, value, ttlSeconds);
}

export function deleteCached<T>(key: number): void {
    cache.del(key);
}

export function getCacheStatus() {
    return cache.getStats();
}

export function getCacheStatistics() {
    return {
        ...statistics,
        totalRequests: statistics.hits + statistics.misses,
        TTL: DEFAULT_TTL_SECONDS
    }
}

export function clearCache(): void {
  cache.flushAll();

  statistics.hits = 0;
  statistics.misses = 0;
}