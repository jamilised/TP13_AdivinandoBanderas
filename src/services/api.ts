import { Country } from '../types/game';

const FLAGS_API = 'https://countriesnow.space/api/v0.1/countries/flag/images';
const CAPITALS_API = 'https://countriesnow.space/api/v0.1/countries/capital';

const FALLBACK_COUNTRIES: Country[] = [
  { name: 'Argentina', capital: 'Buenos Aires', flag: 'https://flagcdn.com/w320/ar.png' },
  { name: 'Brasil', capital: 'Brasilia', flag: 'https://flagcdn.com/w320/br.png' },
  { name: 'Chile', capital: 'Santiago', flag: 'https://flagcdn.com/w320/cl.png' },
  { name: 'Uruguay', capital: 'Montevideo', flag: 'https://flagcdn.com/w320/uy.png' },
  { name: 'España', capital: 'Madrid', flag: 'https://flagcdn.com/w320/es.png' },
  { name: 'Francia', capital: 'París', flag: 'https://flagcdn.com/w320/fr.png' },
  { name: 'Italia', capital: 'Roma', flag: 'https://flagcdn.com/w320/it.png' },
  { name: 'Alemania', capital: 'Berlín', flag: 'https://flagcdn.com/w320/de.png' },
  { name: 'Japón', capital: 'Tokio', flag: 'https://flagcdn.com/w320/jp.png' },
  { name: 'México', capital: 'Ciudad de México', flag: 'https://flagcdn.com/w320/mx.png' },
  { name: 'Colombia', capital: 'Bogotá', flag: 'https://flagcdn.com/w320/co.png' },
  { name: 'Canadá', capital: 'Ottawa', flag: 'https://flagcdn.com/w320/ca.png' },
  { name: 'Australia', capital: 'Camberra', flag: 'https://flagcdn.com/w320/au.png' },
  { name: 'Perú', capital: 'Lima', flag: 'https://flagcdn.com/w320/pe.png' },
];

export const fetchCountriesWithCapitals = async (): Promise<Country[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); 

  try {
    const [flagsRes, capitalsRes] = await Promise.all([
      fetch(FLAGS_API, { signal: controller.signal }),
      fetch(CAPITALS_API, { signal: controller.signal }),
    ]);

    clearTimeout(timeoutId);

    const flagsData = await flagsRes.json();
    const capitalsData = await capitalsRes.json();

    if (flagsData.error || !flagsData.data || !Array.isArray(flagsData.data)) {
      throw new Error('Respuesta inválida de la API de Banderas');
    }

    const capitalsMap = new Map<string, string>();
    if (!capitalsData.error && Array.isArray(capitalsData.data)) {
      capitalsData.data.forEach((item: { name: string; capital: string }) => {
        if (item.name && item.capital) {
          capitalsMap.set(item.name.toLowerCase().trim(), item.capital);
        }
      });
    }

    const countries: Country[] = flagsData.data
      .map((item: { name: string; flag: string }) => {
        const capital = capitalsMap.get(item.name.toLowerCase().trim()) || 'Desconocida';
        return {
          name: item.name,
          flag: item.flag,
          capital: capital,
        };
      })
      .filter((c: Country) => c.name && c.flag && c.capital !== 'Desconocida');

    return countries.length > 0 ? countries : FALLBACK_COUNTRIES;
  } catch (error) {
    console.warn('Servidor de API no disponible o tiempo agotado. Usando datos de respaldo.', error);
    return FALLBACK_COUNTRIES;
  }
};