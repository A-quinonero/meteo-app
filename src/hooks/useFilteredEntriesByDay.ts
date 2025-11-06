import { useMemo } from 'react'
import type { WeatherEntry } from '../models/weather'

/**
 * Hook para filtrar entradas de clima por día seleccionado.
 * @param entries - Array completo de entradas de clima
 * @param selectedDay - Día seleccionado (0 = hoy, 1 = mañana, etc.)
 * @param timezoneOffsetSeconds - Offset de zona horaria en segundos
 * @returns Entradas filtradas para el día seleccionado
 */
export function useFilteredEntriesByDay(
  entries: WeatherEntry[],
  selectedDay: number,
  timezoneOffsetSeconds: number,
): WeatherEntry[] {
  return useMemo(() => {
    if (!entries || entries.length === 0) return []

    // Obtener la fecha de inicio del día objetivo en la zona horaria local
    const nowUtc = Math.floor(Date.now() / 1000)
    const nowLocal = nowUtc + timezoneOffsetSeconds
    const nowLocalDate = new Date(nowLocal * 1000)
    const nowLocalEpoch = nowLocal // epoch segundos en hora local de la ciudad

    // Calcular el inicio del día actual en la zona local
    const todayStartLocal = new Date(
      Date.UTC(
        nowLocalDate.getUTCFullYear(),
        nowLocalDate.getUTCMonth(),
        nowLocalDate.getUTCDate(),
        0,
        0,
        0,
        0,
      ),
    )

    // Añadir días al inicio del día actual
    const targetDayStartLocal = new Date(todayStartLocal)
    targetDayStartLocal.setUTCDate(targetDayStartLocal.getUTCDate() + selectedDay)

    const targetYear = targetDayStartLocal.getUTCFullYear()
    const targetMonth = targetDayStartLocal.getUTCMonth()
    const targetDate = targetDayStartLocal.getUTCDate()

    const filtered = entries.filter(entry => {
      // Convertir el epoch de la entrada a fecha local
      const entryLocal = entry.epoch + timezoneOffsetSeconds
      const entryLocalDate = new Date(entryLocal * 1000)

      const isSameTargetDay =
        entryLocalDate.getUTCFullYear() === targetYear &&
        entryLocalDate.getUTCMonth() === targetMonth &&
        entryLocalDate.getUTCDate() === targetDate

      // Para el día 0 (hoy en la ciudad), mostrar solo desde "ahora" en adelante
      if (selectedDay === 0) {
        return isSameTargetDay && entryLocal >= nowLocalEpoch
      }

      // Para días futuros, mostrar todo el día completo
      return isSameTargetDay
    })

    console.log(
      `[useFilteredEntriesByDay] Day ${selectedDay}, filtered ${filtered.length} entries from ${entries.length}`,
    )

    return filtered
  }, [entries, selectedDay, timezoneOffsetSeconds])
}

export default useFilteredEntriesByDay
