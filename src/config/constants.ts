export const OPENWEATHER_ICON_URL = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`

export const DEFAULT_CITIES = [
  {
    id: 'sabadell',
    q: 'Sabadell',
    lat: 41.5431,
    lon: 2.1083,
    country: 'ES',
    label: { en: 'Sabadell', es: 'Sabadell' },
  },
  {
    id: 'tokyo',
    q: 'Tokyo',
    lat: 35.6762,
    lon: 139.6503,
    country: 'JP',
    label: { en: 'Tokyo', es: 'Tokio' },
  },
  {
    id: 'losangeles',
    q: 'Los Angeles',
    lat: 34.0522,
    lon: -118.2437,
    country: 'US',
    label: { en: 'Los Angeles', es: 'Los Ángeles' },
  },
] as const

export type SupportedLang = 'en' | 'es'
export type Units = 'metric' | 'imperial'
export type City = (typeof DEFAULT_CITIES)[number]
