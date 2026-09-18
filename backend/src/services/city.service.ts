import fs from 'node:fs/promises';
import path from 'node:path';
import type { CitiesPayload, City } from '../types/city.types.js';

const citiesFilePath = path.resolve(
  process.cwd(),
  '../data/cities.json',
);

export async function getCityCodes(): Promise<string[]> {
  const fileContent = await fs.readFile(citiesFilePath, 'utf-8');

  const cities = JSON.parse(fileContent) as CitiesPayload;

  return cities.List
    .slice(0, 10)
    .map((city) => String(city.CityCode));
}