export const OPENWEATHER_ICON_URL = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`

export const DEFAULT_CITIES = [
  { id: 'london', q: 'London', lat: 51.5074, lon: -0.1278, country: 'GB', label: { en: 'London', es: 'Londres' } },
  { id: 'toronto', q: 'Toronto', lat: 43.65107, lon: -79.347015, country: 'CA', label: { en: 'Toronto', es: 'Toronto' } },
  { id: 'singapore', q: 'Singapore', lat: 1.29027, lon: 103.851959, country: 'SG', label: { en: 'Singapore', es: 'Singapur' } },
] as const

export type SupportedLang = 'en' | 'es'
export type Units = 'metric' | 'imperial'
export type City = typeof DEFAULT_CITIES[number]
