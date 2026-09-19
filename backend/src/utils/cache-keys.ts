export function weatherCacheKey(cityCode: string): string {
  return `weather:${cityCode}`;
}
export const ANALYTICS_CACHE_KEY = 'weather:analytics';