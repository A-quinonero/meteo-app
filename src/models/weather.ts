import { z } from 'zod'

const WeatherItemSchema = z.object({
  dt: z.number(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
  weather: z
    .array(
      z.object({
        description: z.string(),
        icon: z.string(),
      }),
    )
    .min(1),
})

const ForecastApiSchema = z.object({
  list: z.array(WeatherItemSchema),
  city: z.object({
    name: z.string(),
    country: z.string(),
    timezone: z.number(), // seconds shift from UTC
  }),
})

export type ForecastApi = z.infer<typeof ForecastApiSchema>
export const parseForecastApi = (data: unknown): ForecastApi => ForecastApiSchema.parse(data)

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
  city: string
  country: string
  timezoneOffset: number
  entries: WeatherEntry[]
}
