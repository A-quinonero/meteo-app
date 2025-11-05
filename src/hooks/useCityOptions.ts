import { useMemo } from 'react'
import { DEFAULT_CITIES } from '../config/constants'
import type { CityOption } from '../components/common/CitySelector'

export function useCityOptions(lang: 'en' | 'es'): CityOption[] {
  return useMemo(() => DEFAULT_CITIES.map((c) => ({
    id: c.id,
    value: c.id,
    label: c.label[lang],
  })), [lang])
}

export default useCityOptions
