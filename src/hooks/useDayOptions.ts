import { useMemo } from 'react'
import type { DayOption } from '../components/common/DaySelector'
import { getLocalDateShort, getLocalDayName } from '../helpers/datetime'

/**
 * Hook para generar opciones de días basadas en la zona horaria de la ciudad.
 * @param timezoneOffsetSeconds - Offset de zona horaria en segundos
 * @param lang - Idioma para los nombres de días
 * @param daysCount - Número de días a generar (por defecto 5: hoy + 4 días)
 * @returns Array de opciones de días
 */
export function useDayOptions(
  timezoneOffsetSeconds: number,
  lang: 'en' | 'es',
  daysCount: number = 5
): DayOption[] {
  return useMemo(() => {
    const nowUtc = Math.floor(Date.now() / 1000)
    const nowLocal = nowUtc + timezoneOffsetSeconds
    const nowLocalDate = new Date(nowLocal * 1000)
    
    // Calcular el inicio del día actual en la zona local
    const todayStartLocal = new Date(Date.UTC(
      nowLocalDate.getUTCFullYear(),
      nowLocalDate.getUTCMonth(),
      nowLocalDate.getUTCDate(),
      0, 0, 0, 0
    ))
    
    const options: DayOption[] = []

    for (let i = 0; i < daysCount; i++) {
      const dayStartLocal = new Date(todayStartLocal)
      dayStartLocal.setUTCDate(dayStartLocal.getUTCDate() + i)
      
      // Convertir de vuelta a epoch UTC
      const dayEpoch = Math.floor(dayStartLocal.getTime() / 1000) - timezoneOffsetSeconds
      
      let label: string
      if (i === 0) {
        label = lang === 'en' ? 'Today' : 'Hoy'
      } else if (i === 1) {
        label = lang === 'en' ? 'Tomorrow' : 'Mañana'
      } else {
        // Nombre del día de la semana
        label = getLocalDayName(dayEpoch, timezoneOffsetSeconds, lang)
      }

      const date = getLocalDateShort(dayEpoch, timezoneOffsetSeconds, lang)

      options.push({
        value: i,
        label,
        date,
      })
    }

    return options
  }, [timezoneOffsetSeconds, lang, daysCount])
}

export default useDayOptions
