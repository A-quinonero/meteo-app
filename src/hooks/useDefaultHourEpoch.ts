import { useMemo } from 'react'
import type { WeatherEntry } from '../models/weather'

/**
 * Hook que obtiene la hora por defecto a seleccionar:
 * - Si es día actual: la hora más cercana a ahora
 * - Si es día futuro: la primera hora del día
 * 
 * @param timelineEntries - Entradas de la timeline
 * @param timezoneOffsetSeconds - Offset de zona horaria en segundos
 * @param selectedDayString - Día seleccionado en formato YYYY-MM-DD
 * @returns Epoch de la hora por defecto, o null si no hay entradas
 */
export function useDefaultHourEpoch(
  timelineEntries: WeatherEntry[],
  timezoneOffsetSeconds: number,
  selectedDayString: string
): number | null {
  return useMemo(() => {
    if (timelineEntries.length === 0) return null

    const nowUtc = Math.floor(Date.now() / 1000)
    const nowLocal = nowUtc + timezoneOffsetSeconds
    const currentDate = new Date((nowUtc + timezoneOffsetSeconds) * 1000)
    const currentDay = currentDate.toISOString().split('T')[0]

    // Si es el día actual, buscar explícitamente la hora en curso (bloque que contiene 'now')
    if (selectedDayString === currentDay) {
      // Buscar entrada cuyo bloque horario contiene el instante actual
      const currentHour = timelineEntries.find(entry => {
        const entryLocal = entry.epoch + timezoneOffsetSeconds
        return nowLocal >= entryLocal && nowLocal < (entryLocal + 3600)
      })
      
      // PRIORIDAD 1: Si encontramos la hora actual, retornarla
      if (currentHour) return currentHour.epoch
      
      // PRIORIDAD 2: Si no hay hora en curso (p.ej., datos con huecos), buscar la hora pasada más reciente
      // (esto captura el caso donde estamos entre dos horas, ej: 14:30 → mostrar hora 14:00)
      const recentPastHour = timelineEntries
        .filter(entry => {
          const entryLocal = entry.epoch + timezoneOffsetSeconds
          return entryLocal <= nowLocal
        })
        .sort((a, b) => b.epoch - a.epoch)[0] // Ordenar descendente, tomar la más reciente
      
      if (recentPastHour) return recentPastHour.epoch
      
      // PRIORIDAD 3: Si todas las horas son futuras, tomar la primera
      return timelineEntries[0].epoch
    }

    // Si es día futuro, retornar la primera hora disponible
    return timelineEntries[0].epoch
  }, [timelineEntries, timezoneOffsetSeconds, selectedDayString])
}

export default useDefaultHourEpoch
