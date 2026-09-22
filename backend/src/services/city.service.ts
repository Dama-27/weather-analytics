import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import type { CitiesPayload } from '../types/city.types.js';

function getCitiesFilePath(): string {
  const dirPath = path.resolve(__dirname, '../../../data/cities.json');
  if (existsSync(dirPath)) {
    return dirPath;
  }
  const cwdRootPath = path.resolve(process.cwd(), 'data/cities.json');
  if (existsSync(cwdRootPath)) {
    return cwdRootPath;
  }
  return path.resolve(process.cwd(), '../data/cities.json');
}

export async function getCityCodes(): Promise<string[]> {
  const fileContent = await fs.readFile(getCitiesFilePath(), 'utf-8');

  const cities = JSON.parse(fileContent) as CitiesPayload;

  return cities.List
    .slice(0, 10)
    .map((city) => String(city.CityCode));
}