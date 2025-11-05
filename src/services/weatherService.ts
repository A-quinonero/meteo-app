import http from '../lib/http'
import { OPENWEATHER_ICON_URL } from '../config/constants'
import { parseForecastApi, type WeatherForecast, type WeatherEntry } from '../models/weather'
import { isSameLocalDate } from '../helpers/datetime'

export type Language = 'en' | 'es'
export type Units = 'metric' | 'imperial'

export async function getTodayForecastByCityName(cityQ: string, lang: Language, units: Units): Promise<WeatherForecast> {
  const resp = await http.get('/forecast', { params: { q: cityQ, lang, units } })
  const parsed = parseForecastApi(resp.data)

  const tz = parsed.city.timezone
  const todayEntries = parsed.list.filter((item: typeof parsed.list[number]) => isSameLocalDate(item.dt, tz))
  const entries: WeatherEntry[] = todayEntries.map((item: typeof parsed.list[number]) => ({
    epoch: item.dt,
    timeISO: new Date(item.dt * 1000).toISOString(),
    temp: item.main.temp,
    tempMin: item.main.temp_min,
    tempMax: item.main.temp_max,
    description: item.weather[0].description,
    icon: OPENWEATHER_ICON_URL(item.weather[0].icon),
  }))

  return {
    city: parsed.city.name,
    country: parsed.city.country,
    timezoneOffset: tz,
    entries,
  }
}
