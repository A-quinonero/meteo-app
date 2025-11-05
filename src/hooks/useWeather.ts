import { useQuery } from '@tanstack/react-query'
import { getTodayForecastByCityName, type Language, type Units } from '../services/weatherService'

export function useWeather(cityQ: string, lang: Language, units: Units = 'metric') {
  return useQuery({
    queryKey: ['weather', cityQ, lang, units],
    queryFn: () => getTodayForecastByCityName(cityQ, lang, units),
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: 1,
  })
}
