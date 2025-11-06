import http from '../lib/http'
import { OPENWEATHER_ICON_URL } from '../config/constants'
import { parseOneCallApi, type WeatherForecast, type WeatherEntry } from '../models/weather'

export type Language = 'en' | 'es'
export type Units = 'metric' | 'imperial'

/**
 * Obtiene forecast horario para múltiples días (hasta 48 horas) por coordenadas.
 * @param lat - Latitud
 * @param lon - Longitud
 * @param lang - Idioma
 * @param units - Sistema de unidades
 * @returns Forecast con todas las entradas horarias disponibles
 */
export async function getHourlyForecastByCoords(
  lat: number,
  lon: number,
  lang: Language,
  units: Units,
): Promise<WeatherForecast> {
  const url = 'https://api.openweathermap.org/data/3.0/onecall'
  const resp = await http.get(url, {
    params: {
      lat,
      lon,
      lang,
      units,
      exclude: 'minutely,daily,alerts',
    },
  })

  const parsed = parseOneCallApi(resp.data)
  const tz = parsed.timezone_offset // seconds

  // Agrupar por día para calcular min/max de cada día
  const entriesByDay = new Map<string, number[]>()

  parsed.hourly.forEach(item => {
    const localDate = new Date((item.dt + tz) * 1000)
    const dayKey = `${localDate.getUTCFullYear()}-${localDate.getUTCMonth()}-${localDate.getUTCDate()}`

    if (!entriesByDay.has(dayKey)) {
      entriesByDay.set(dayKey, [])
    }
    entriesByDay.get(dayKey)!.push(item.temp)
  })

  // Calcular min/max por día
  const dayMinMax = new Map<string, { min: number; max: number }>()
  entriesByDay.forEach((temps, dayKey) => {
    dayMinMax.set(dayKey, {
      min: Math.min(...temps),
      max: Math.max(...temps),
    })
  })

  // Mapear entradas con min/max del día correspondiente
  const entries: WeatherEntry[] = parsed.hourly.map(item => {
    const localDate = new Date((item.dt + tz) * 1000)
    const dayKey = `${localDate.getUTCFullYear()}-${localDate.getUTCMonth()}-${localDate.getUTCDate()}`
    const minMax = dayMinMax.get(dayKey) || { min: item.temp, max: item.temp }

    return {
      epoch: item.dt,
      timeISO: new Date(item.dt * 1000).toISOString(),
      temp: item.temp,
      tempMin: minMax.min,
      tempMax: minMax.max,
      description: item.weather[0].description,
      icon: OPENWEATHER_ICON_URL(item.weather[0].icon),
    }
  })

  // Mapear 'current' si viene en la respuesta
  let current: WeatherEntry | undefined
  if (parsed.current) {
    const c = parsed.current
    const localDate = new Date((c.dt + tz) * 1000)
    const dayKey = `${localDate.getUTCFullYear()}-${localDate.getUTCMonth()}-${localDate.getUTCDate()}`
    const minMax = dayMinMax.get(dayKey) || { min: c.temp, max: c.temp }
    current = {
      epoch: c.dt,
      timeISO: new Date(c.dt * 1000).toISOString(),
      temp: c.temp,
      tempMin: minMax.min,
      tempMax: minMax.max,
      description: c.weather[0].description,
      icon: OPENWEATHER_ICON_URL(c.weather[0].icon),
    }
  }

  return {
    timezoneOffset: tz,
    current,
    entries,
  }
}
