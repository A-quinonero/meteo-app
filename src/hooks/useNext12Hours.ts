import { useMemo } from 'react'
import type { WeatherEntry } from '../models/weather'

/**
 * Hook que retorna las horas para la timeline según el día seleccionado:
 * - Día actual: próximas 12 horas desde ahora
 * - Días futuros: todas las horas disponibles del día
 *
 * @param entries - Array completo de entradas de clima
 * @param timezoneOffsetSeconds - Offset de zona horaria en segundos
 * @param selectedDay - Día seleccionado en formato YYYY-MM-DD
 * @returns Entradas horarias filtradas según el día
 */
export function useTimelineHours(
  entries: WeatherEntry[],
  timezoneOffsetSeconds: number,
  selectedDay: string,
): WeatherEntry[] {
  return useMemo(() => {
    if (!entries || entries.length === 0) return []

    // Hora actual en la zona horaria local de la ciudad
    const nowUtc = Math.floor(Date.now() / 1000)
    const nowLocal = nowUtc + timezoneOffsetSeconds

    // Obtener el día actual en la zona horaria local
    const currentDate = new Date((nowUtc + timezoneOffsetSeconds) * 1000)
    const currentDay = currentDate.toISOString().split('T')[0]

    // Si es el día actual, incluir la hora en curso (bloque horario actual)
    // Estrategia: buscar el primer índice futuro y retroceder uno para incluir la hora actual.
    if (selectedDay === currentDay) {
      if (entries.length === 0) return []

      // Encontrar el índice del primer elemento cuyo inicio de hora local es >= ahora
      let futureIdx = entries.findIndex(entry => entry.epoch + timezoneOffsetSeconds >= nowLocal)
      if (futureIdx === -1) {
        // No hay futuros: empezar desde el último disponible
        futureIdx = entries.length
      }

      // Candidato previo que contiene la hora en curso (si pertenece a hoy)
      let startIdx = Math.max(0, futureIdx - 1)

      // Asegurar que el startIdx pertenece al día actual (evitar incluir día anterior en 00:xx)
      const isSameDay = (entry: WeatherEntry) => {
        const d = new Date((entry.epoch + timezoneOffsetSeconds) * 1000)
        const dayStr = d.toISOString().split('T')[0]
        return dayStr === currentDay
      }

      // Si el previo no es del mismo día (p.ej. 00:15 → previo sería 23:00 día anterior),
      // entonces usar el futureIdx como inicio.
      if (entries[startIdx] && !isSameDay(entries[startIdx])) {
        startIdx = futureIdx
      }

      const result: WeatherEntry[] = []
      for (let i = startIdx; i < entries.length && result.length < 12; i++) {
        result.push(entries[i])
      }
      return result
    }

    // Si es un día futuro, devolver todas las horas de ese día
    return entries.filter(entry => {
      const entryDate = new Date((entry.epoch + timezoneOffsetSeconds) * 1000)
      const entryDay = entryDate.toISOString().split('T')[0]
      return entryDay === selectedDay
    })
  }, [entries, timezoneOffsetSeconds, selectedDay])
}

export default useTimelineHours
