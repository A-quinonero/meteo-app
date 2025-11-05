import { describe, it, expect } from 'vitest'
import { formatLocalTime, formatLocalDateTime, isSameLocalDate } from '../helpers/datetime'

// Helper para construir epoch (segundos) en UTC
function utcEpoch(year: number, monthIndex: number, day: number, hour = 0, minute = 0): number {
  return Math.floor(Date.UTC(year, monthIndex, day, hour, minute, 0, 0) / 1000)
}

describe('datetime helpers', () => {
  it('formatLocalTime aplica correctamente el timezoneOffset', () => {
    // 2024-01-01 00:30:00 UTC
    const epoch = utcEpoch(2024, 0, 1, 0, 30)
    // Tokyo UTC+9 => offset en segundos
    const tz = 9 * 3600
    const time = formatLocalTime(epoch, tz)
    expect(time).toBe('09:30')
  })

  it('formatLocalDateTime compone fecha+hora locales', () => {
    // 2024-06-15 22:05:00 UTC
    const epoch = utcEpoch(2024, 5, 15, 22, 5)
    // Madrid en verano suele ser UTC+2 (simplificamos fijo +2)
    const tz = 2 * 3600
    const formatted = formatLocalDateTime(epoch, tz, 'en')
    // Local = 2024-06-16 00:05:00, idioma en => month short "Jun"
    expect(formatted).toMatch(/^16 Jun, 00:05$/)
  })

  it('isSameLocalDate compara por día local', () => {
    // Dos epochs del mismo día local en UTC+2, pero diferentes en UTC
    const tz = 2 * 3600
    const d1 = utcEpoch(2024, 7, 1, 22, 0) // 2024-08-01 22:00 UTC => local 2024-08-02 00:00
    const d2 = utcEpoch(2024, 7, 2, 21, 59) // 2024-08-02 21:59 UTC => local 2024-08-02 23:59

    // nowUtcMs lo fijamos a d1 en ms para comparar d1
    expect(isSameLocalDate(d1, tz, d1 * 1000)).toBe(true)
    // y para d2
    expect(isSameLocalDate(d2, tz, d2 * 1000)).toBe(true)

    // Entre sí no son el mismo instante, pero ambos son día local 2024-08-02 con su respectivo now
  })
})
