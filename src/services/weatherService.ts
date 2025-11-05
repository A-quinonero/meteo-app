import http from '../lib/http'
import { OPENWEATHER_ICON_URL } from '../config/constants'
import { parseOneCallApi, type WeatherForecast, type WeatherEntry } from '../models/weather'
import { isSameLocalDate } from '../helpers/datetime'

export type Language = 'en' | 'es'
export type Units = 'metric' | 'imperial'

export async function getTodayHourlyByCoords(lat: number, lon: number, lang: Language, units: Units): Promise<WeatherForecast> {
  const url = 'https://api.openweathermap.org/data/3.0/onecall'
  const resp = await http.get(url, { params: { lat, lon, lang, units, exclude: 'minutely,daily,alerts' } })
  const parsed = parseOneCallApi(resp.data)

  const tz = parsed.timezone_offset // seconds
  const todayEntriesRaw = parsed.hourly.filter((item) => isSameLocalDate(item.dt, tz))
  const temps = todayEntriesRaw.map((i) => i.temp)
  const dailyMin = temps.length ? Math.min(...temps) : NaN
  const dailyMax = temps.length ? Math.max(...temps) : NaN

  const entries: WeatherEntry[] = todayEntriesRaw.map((item) => ({
    epoch: item.dt,
    timeISO: new Date(item.dt * 1000).toISOString(),
    temp: item.temp,
    tempMin: dailyMin,
    tempMax: dailyMax,
    description: item.weather[0].description,
    icon: OPENWEATHER_ICON_URL(item.weather[0].icon),
  }))

  return {
    timezoneOffset: tz,
    entries,
  }
}
