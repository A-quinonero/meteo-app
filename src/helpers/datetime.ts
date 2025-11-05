// Comprueba si un epoch (segundos) pertenece al mismo día local que "ahora" para una zona con offset en segundos
export function isSameLocalDate(epochSeconds: number, timezoneOffsetSeconds: number, nowUtcMs = Date.now()): boolean {
  const entryLocal = new Date((epochSeconds * 1000) + timezoneOffsetSeconds * 1000)
  const nowLocal = new Date(nowUtcMs + timezoneOffsetSeconds * 1000)

  return (
    entryLocal.getUTCFullYear() === nowLocal.getUTCFullYear() &&
    entryLocal.getUTCMonth() === nowLocal.getUTCMonth() &&
    entryLocal.getUTCDate() === nowLocal.getUTCDate()
  )
}
