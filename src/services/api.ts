import { Country } from '../types/game';

const FLAGS_API = 'https://countriesnow.space/api/v0.1/countries/flag/images';
const CAPITALS_API = 'https://countriesnow.space/api/v0.1/countries/capital';

export const fetchCountriesWithCapitals = async (): Promise<Country[]> => {
  try {
    const [flagsRes, capitalsRes] = await Promise.all([
      fetch(FLAGS_API),
      fetch(CAPITALS_API),
    ]);

    const flagsData = await flagsRes.json();
    const capitalsData = await capitalsRes.json();

    if (flagsData.error || !flagsData.data) return [];

    const capitalsMap = new Map<string, string>();
    if (!capitalsData.error && Array.isArray(capitalsData.data)) {
      capitalsData.data.forEach((item: { name: string; capital: string }) => {
        if (item.name && item.capital) {
          capitalsMap.set(item.name.toLowerCase().trim(), item.capital);
        }
      });
    }

    const countries: Country[] = flagsData.data
      .map((item: { name: string; flag: string; iso2?: string; iso3?: string }) => {
        const capital = capitalsMap.get(item.name.toLowerCase().trim()) || 'Desconocida';
        return {
          name: item.name,
          flag: item.flag,
          capital: capital,
          iso2: item.iso2,
          iso3: item.iso3,
        };
      })
      .filter((c: Country) => c.name && c.flag && c.capital !== 'Desconocida');

    return countries;
  } catch (error) {
    console.error('Error cargando países:', error);
    return [];
  }
};