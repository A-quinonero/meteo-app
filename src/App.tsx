import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_CITIES, type City } from './config/constants'
import { useWeather } from './hooks/useWeather'
import { useDayOptions } from './hooks/useDayOptions'
import { useFilteredEntriesByDay } from './hooks/useFilteredEntriesByDay'
import type { WeatherEntry } from './models/weather'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CitySelector, { type CityOption } from './components/common/CitySelector'
import DaySelector from './components/common/DaySelector'
import ForecastGrid from './components/weather/ForecastGrid'
import WeatherSummary from './components/weather/WeatherSummary'
import LoadingState from './components/common/LoadingState'
import ErrorState from './components/common/ErrorState'
import styled from 'styled-components'

export default function App() {
  const { t, i18n } = useTranslation('common')
  const lang = (i18n.language?.startsWith('es') ? 'es' : 'en') as 'en' | 'es'
  const [cityId, setCityId] = useState<string>(DEFAULT_CITIES[0].id)
  const [selectedDay, setSelectedDay] = useState<number>(0) // 0 = hoy
  
  const selectedCity = DEFAULT_CITIES.find((c) => c.id === cityId) as City
  const { data, isLoading, error } = useWeather(selectedCity, lang, 'metric')

  // Calcular cuántos días locales distintos hay en las entradas (p.ej. hourly suele ser ~48h => 2 días)
  const timezoneOffset = data?.timezoneOffset || 0
  const availableDaysCount = useMemo(() => {
    const entries = data?.entries || []
    if (entries.length === 0) return 1
    const set = new Set<string>()
    for (const e of entries) {
      const local = new Date((e.epoch + timezoneOffset) * 1000)
      const key = `${local.getUTCFullYear()}-${local.getUTCMonth()}-${local.getUTCDate()}`
      set.add(key)
      if (set.size >= 5) break
    }
    return Math.min(5, set.size)
  }, [data?.entries, timezoneOffset])

  // Asegurar que el día seleccionado esté dentro de rango cuando cambian las opciones
  useEffect(() => {
    if (selectedDay > availableDaysCount - 1) {
      setSelectedDay(availableDaysCount - 1)
    }
  }, [availableDaysCount, selectedDay])

  // Generar opciones de días basadas en la zona horaria de la ciudad y días disponibles
  const dayOptions = useDayOptions(timezoneOffset, lang, availableDaysCount)
  
  // Filtrar entradas por día seleccionado
  const filteredEntries = useFilteredEntriesByDay(
    data?.entries || [],
    selectedDay,
    data?.timezoneOffset || 0
  )

  // Entradas del día completo (sin recorte "desde ahora") para min/max del resumen
  const fullDayEntries = useMemo(() => {
    const entries = data?.entries || []
    const tz = timezoneOffset
    if (entries.length === 0) return [] as WeatherEntry[]

    const nowUtc = Math.floor(Date.now() / 1000)
    const nowLocal = nowUtc + tz
    const nowLocalDate = new Date(nowLocal * 1000)

    const todayStartLocal = new Date(Date.UTC(
      nowLocalDate.getUTCFullYear(),
      nowLocalDate.getUTCMonth(),
      nowLocalDate.getUTCDate(),
      0, 0, 0, 0
    ))
    const targetDayStartLocal = new Date(todayStartLocal)
    targetDayStartLocal.setUTCDate(targetDayStartLocal.getUTCDate() + selectedDay)

    const targetYear = targetDayStartLocal.getUTCFullYear()
    const targetMonth = targetDayStartLocal.getUTCMonth()
    const targetDate = targetDayStartLocal.getUTCDate()

    return entries.filter((e) => {
      const entryLocal = e.epoch + tz
      const d = new Date(entryLocal * 1000)
      return (
        d.getUTCFullYear() === targetYear &&
        d.getUTCMonth() === targetMonth &&
        d.getUTCDate() === targetDate
      )
    })
  }, [data?.entries, selectedDay, timezoneOffset])

  const cityOptions: CityOption[] = DEFAULT_CITIES.map((c) => ({ 
    id: c.id, 
    value: c.id, 
    label: c.label[lang] 
  }))

  return (
    <PageWrapper>
      <Header title={t('appName')} />

      <MainContainer>
        <CitySelectorWrapper>
          <CitySelector 
            label={lang === 'en' ? 'Select a city' : 'Selecciona una ciudad'} 
            value={cityId} 
            options={cityOptions} 
            onChange={(newCityId) => {
              setCityId(newCityId)
              setSelectedDay(0) // Reset al cambiar ciudad
            }}
            helperText={lang === 'en' ? 'Real-time weather forecast' : 'Previsión meteorológica en tiempo real'}
          />
        </CitySelectorWrapper>

        {isLoading && <LoadingState />}
        {error && <ErrorState message={t('errorLoading')} />}
        {data && data.entries.length > 0 && (
          <>
            <DaySelectorWrapper>
              <DaySelector 
                options={dayOptions} 
                selectedDay={selectedDay} 
                onChange={setSelectedDay} 
              />
            </DaySelectorWrapper>

            {filteredEntries.length > 0 || (selectedDay === 0 && data?.current) ? (
              <ResponsiveLayout>
                <SummaryColumn>
                  <WeatherSummary
                    current={(selectedDay === 0 && data?.current) ? data.current : filteredEntries[0]}
                    dailyMin={(filteredEntries.length > 0
                      ? Math.min(...filteredEntries.map((e) => e.tempMin))
                      : (fullDayEntries.length > 0
                          ? Math.min(...fullDayEntries.map((e) => e.tempMin))
                          : (selectedDay === 0 && data?.current ? Math.round(data.current.temp) : 0)
                        )
                    )}
                    dailyMax={(filteredEntries.length > 0
                      ? Math.max(...filteredEntries.map((e) => e.tempMax))
                      : (fullDayEntries.length > 0
                          ? Math.max(...fullDayEntries.map((e) => e.tempMax))
                          : (selectedDay === 0 && data?.current ? Math.round(data.current.temp) : 0)
                        )
                    )}
                    lang={lang}
                    cityName={selectedCity.label[lang]}
                    timezoneOffset={timezoneOffset}
                  />
                </SummaryColumn>
                <ForecastColumn>
                  <ForecastGrid entries={filteredEntries as WeatherEntry[]} lang={lang} timezoneOffset={timezoneOffset} />
                </ForecastColumn>
              </ResponsiveLayout>
            ) : (
              <ErrorState 
                message={
                  lang === 'en' 
                    ? 'No data available for the selected day' 
                    : 'No hay datos disponibles para el día seleccionado'
                }
              />
            )}
          </>
        )}
      </MainContainer>

      <Footer lang={lang} />
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  min-height: 100vh;
  width:100vw;
  background: linear-gradient(to bottom, #0a0e27 0%, #1a1f3a 100%);
  color: #f3f4f6;
`

const MainContainer = styled.main`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 16px 32px;

  @media (min-width: 640px) {
    padding: 0 24px 40px;
  }

  @media (min-width: 1024px) {
    padding: 0 40px 48px;
  }
`

const CitySelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0 24px;

  @media (min-width: 1024px) {
    padding: 24px 0 28px;
  }
`

const DaySelectorWrapper = styled.div`
  margin-bottom: 32px;

  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
`

const ResponsiveLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 400px 1fr;
    gap: 32px;
    align-items: start;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 450px 1fr;
    gap: 40px;
  }
`

const SummaryColumn = styled.div`
  width: 100%;
`

const ForecastColumn = styled.div`
  width: 100%;
  min-width: 0;
`
 
