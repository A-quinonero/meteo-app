import { useQuery } from '@tanstack/react-query'
import { getHourlyForecastByCoords, type Language, type Units } from '../services/weatherService'
import type { WeatherForecast } from '../models/weather'
import type { City } from '../config/constants'

export function useWeather(city: City, lang: Language, units: Units = 'metric') {
  return useQuery<WeatherForecast>({
    queryKey: ['weather', { id: city.id, lat: city.lat, lon: city.lon, lang, units }],
    queryFn: () => getHourlyForecastByCoords(city.lat, city.lon, lang, units),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: Boolean(city?.id),
  })
}

export default useWeather
