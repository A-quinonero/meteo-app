import { useMemo } from 'react'

/**
 * Hook que convierte el índice de día seleccionado (0 = hoy, 1 = mañana, etc.)
 * a un string en formato YYYY-MM-DD basado en la zona horaria local de la ciudad.
 * 
 * @param selectedDay - Índice del día (0 = hoy)
 * @param timezoneOffsetSeconds - Offset de zona horaria en segundos
 * @returns String en formato YYYY-MM-DD
 */
export function useSelectedDayString(
  selectedDay: number,
  timezoneOffsetSeconds: number
): string {
  return useMemo(() => {
    const nowUtc = Math.floor(Date.now() / 1000)
    const nowLocal = nowUtc + timezoneOffsetSeconds
    const nowLocalDate = new Date(nowLocal * 1000)

    const todayStartLocal = new Date(Date.UTC(
      nowLocalDate.getUTCFullYear(),
      nowLocalDate.getUTCMonth(),
      nowLocalDate.getUTCDate(),
      0, 0, 0, 0
    ))
    
    const targetDayStartLocal = new Date(todayStartLocal)
    targetDayStartLocal.setUTCDate(targetDayStartLocal.getUTCDate() + selectedDay)

    return targetDayStartLocal.toISOString().split('T')[0]
  }, [selectedDay, timezoneOffsetSeconds])
}

export default useSelectedDayString
