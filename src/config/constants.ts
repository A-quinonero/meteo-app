export const OPENWEATHER_ICON_URL = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`

export const DEFAULT_CITIES = [
  { id: 'london', q: 'London', label: { en: 'London', es: 'Londres' } },
  { id: 'toronto', q: 'Toronto', label: { en: 'Toronto', es: 'Toronto' } },
  { id: 'singapore', q: 'Singapore', label: { en: 'Singapore', es: 'Singapur' } },
] as const

export type SupportedLang = 'en' | 'es'
export type Units = 'metric' | 'imperial'
