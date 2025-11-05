import { z } from 'zod'

// One Call 3.0 hourly schema (lo mínimo necesario)
const OneCallWeatherSchema = z.object({
  description: z.string(),
  icon: z.string(),
})

const OneCallHourlyItemSchema = z.object({
  dt: z.number(), // epoch seconds UTC
  temp: z.number(),
  weather: z.array(OneCallWeatherSchema).min(1),
})

const OneCallCurrentSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  weather: z.array(OneCallWeatherSchema).min(1),
})

const OneCallApiSchema = z.object({
  timezone_offset: z.number(),
  current: OneCallCurrentSchema.optional(),
  hourly: z.array(OneCallHourlyItemSchema),
})

export type OneCallApi = z.infer<typeof OneCallApiSchema>
export const parseOneCallApi = (data: unknown): OneCallApi => OneCallApiSchema.parse(data)

export type WeatherEntry = {
  epoch: number
  timeISO: string
  temp: number
  tempMin: number
  tempMax: number
  description: string
  icon: string // url completa
}

export type WeatherForecast = {
  city?: string
  country?: string
  timezoneOffset: number
  current?: WeatherEntry
  entries: WeatherEntry[]
}
