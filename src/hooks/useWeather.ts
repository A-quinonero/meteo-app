import { useQuery } from '@tanstack/react-query'
import { getTodayForecastByCityName, type Language, type Units } from '../services/weatherService'
import type { WeatherForecast } from '../models/weather'

export function useWeather(cityQ: string, lang: Language, units: Units = 'metric') {
  return useQuery<WeatherForecast>({
    queryKey: ['weather', { cityQ, lang, units }],
    queryFn: () => getTodayForecastByCityName(cityQ, lang, units),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: Boolean(cityQ),
  })
}

export default useWeather
