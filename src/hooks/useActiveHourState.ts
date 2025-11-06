import { useEffect, useMemo, useState } from 'react'
import type { WeatherEntry } from '../models/weather'
import { useDefaultHourEpoch } from './useDefaultHourEpoch'

export type ActiveHourState = {
  activeHourEpoch: number | undefined
  selectedHourEntry: WeatherEntry | undefined
  onSelectHour: (epoch: number) => void
}

/**
 * Gestiona la hora activa: calcula por defecto y memoiza la entry seleccionada.
 * Resetea la selección manual cuando cambia el día seleccionado (selectedDayString).
 */
export function useActiveHourState(
  timelineEntries: WeatherEntry[],
  timezoneOffsetSeconds: number,
  selectedDayString: string,
): ActiveHourState {
  const [selectedEpoch, setSelectedEpoch] = useState<number | null>(null)

  const defaultEpoch = useDefaultHourEpoch(
    timelineEntries,
    timezoneOffsetSeconds,
    selectedDayString,
  )

  const activeHourEpoch = selectedEpoch ?? defaultEpoch ?? undefined

  const selectedHourEntry = useMemo(() => {
    if (!activeHourEpoch) return undefined
    // Memoiza la búsqueda para evitar recalcular en cada render
    return timelineEntries.find(e => e.epoch === activeHourEpoch)
  }, [timelineEntries, activeHourEpoch])

  // Reset al cambiar el día (o timeline)
  useEffect(() => {
    setSelectedEpoch(null)
  }, [selectedDayString])

  return {
    activeHourEpoch,
    selectedHourEntry,
    onSelectHour: setSelectedEpoch,
  }
}

export default useActiveHourState
