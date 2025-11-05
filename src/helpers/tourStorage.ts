const TOUR_COMPLETED_KEY = 'meteo-app-tour-completed'

/**
 * Verifica si el usuario ya completó el tutorial
 */
export function isTourCompleted(): boolean {
  try {
    return localStorage.getItem(TOUR_COMPLETED_KEY) === 'true'
  } catch {
    return false
  }
}

/**
 * Marca el tutorial como completado
 */
export function setTourCompleted(): void {
  try {
    localStorage.setItem(TOUR_COMPLETED_KEY, 'true')
  } catch {
    // Si falla localStorage, seguir sin errores
  }
}

/**
 * Reinicia el tutorial (útil para desarrollo/testing)
 */
export function resetTour(): void {
  try {
    localStorage.removeItem(TOUR_COMPLETED_KEY)
  } catch {
    // Si falla localStorage, seguir sin errores
  }
}
