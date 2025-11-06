import { useMemo } from 'react'
import type { WeatherEntry } from '../models/weather'

/**
 * Calcula cuántos días locales distintos hay en las entradas (máximo 5).
 */
export function useAvailableDaysCount(
  entries: WeatherEntry[],
  timezoneOffsetSeconds: number,
): number {
  return useMemo(() => {
    if (!entries || entries.length === 0) return 1
    const set = new Set<string>()
    for (const e of entries) {
      const local = new Date((e.epoch + timezoneOffsetSeconds) * 1000)
      const key = `${local.getUTCFullYear()}-${local.getUTCMonth()}-${local.getUTCDate()}`
      set.add(key)
      if (set.size >= 5) break
    }
    return Math.min(5, set.size)
  }, [entries, timezoneOffsetSeconds])
}

export default useAvailableDaysCount
