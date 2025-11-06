// Comprueba si un epoch (segundos) pertenece al mismo día local que "ahora" para una zona con offset en segundos
export function isSameLocalDate(
  epochSeconds: number,
  timezoneOffsetSeconds: number,
  nowUtcMs = Date.now(),
): boolean {
  const entryLocal = new Date(epochSeconds * 1000 + timezoneOffsetSeconds * 1000)
  const nowLocal = new Date(nowUtcMs + timezoneOffsetSeconds * 1000)

  return (
    entryLocal.getUTCFullYear() === nowLocal.getUTCFullYear() &&
    entryLocal.getUTCMonth() === nowLocal.getUTCMonth() &&
    entryLocal.getUTCDate() === nowLocal.getUTCDate()
  )
}

/**
 * Formatea una hora en la zona horaria local de la ciudad.
 */
export function formatLocalTime(epochSeconds: number, timezoneOffsetSeconds: number): string {
  const localDate = new Date((epochSeconds + timezoneOffsetSeconds) * 1000)
  const hours = String(localDate.getUTCHours()).padStart(2, '0')
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * Formatea fecha y hora completa en la zona horaria local.
 */
export function formatLocalDateTime(
  epochSeconds: number,
  timezoneOffsetSeconds: number,
  lang: 'en' | 'es',
): string {
  const localDate = new Date((epochSeconds + timezoneOffsetSeconds) * 1000)

  const day = localDate.getUTCDate()
  const month = localDate.toLocaleDateString(lang, { month: 'short', timeZone: 'UTC' })
  const hours = String(localDate.getUTCHours()).padStart(2, '0')
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0')

  return `${day} ${month}, ${hours}:${minutes}`
}

/**
 * Obtiene el nombre del día de la semana en la zona horaria local.
 */
export function getLocalDayName(
  epochSeconds: number,
  timezoneOffsetSeconds: number,
  lang: 'en' | 'es',
): string {
  const localDate = new Date((epochSeconds + timezoneOffsetSeconds) * 1000)

  return localDate.toLocaleDateString(lang, {
    weekday: 'long',
    timeZone: 'UTC',
  })
}

/**
 * Obtiene la fecha formateada (día y mes) en la zona horaria local.
 */
export function getLocalDateShort(
  epochSeconds: number,
  timezoneOffsetSeconds: number,
  lang: 'en' | 'es',
): string {
  const localDate = new Date((epochSeconds + timezoneOffsetSeconds) * 1000)

  const day = localDate.getUTCDate()
  const month = localDate.toLocaleDateString(lang, { month: 'short', timeZone: 'UTC' })

  return `${day} ${month}`
}
