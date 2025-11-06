import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_CITIES, type City } from './config/constants'
import { useWeather } from './hooks/useWeather'
import { useDayOptions } from './hooks/useDayOptions'
import { useTimelineHours } from './hooks/useNext12Hours'
import { useSelectedDayString } from './hooks/useSelectedDayString'
import { useAvailableDaysCount } from './hooks/useAvailableDaysCount'
import { useActiveHourState } from './hooks/useActiveHourState'
import { useCityOptions } from './hooks/useCityOptions'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CitySelector from './components/common/CitySelector'
import DaySelector from './components/common/DaySelector'
import HourlyTimeline from './components/weather/HourlyTimeline'
import HourDetail from './components/weather/HourDetail'
import LoadingState from './components/common/LoadingState'
import ErrorState from './components/common/ErrorState'
import FadeTransition from './components/common/FadeTransition'
import TourManager from './components/tour/TourManager'
import styled from 'styled-components'

export default function App() {
  const { t, i18n } = useTranslation('common')
  const lang = (i18n.language?.startsWith('es') ? 'es' : 'en') as 'en' | 'es'
  const [cityId, setCityId] = useState<string>(DEFAULT_CITIES[0].id)
  const [selectedDay, setSelectedDay] = useState<number>(0) // 0 = hoy
  
  const selectedCity = DEFAULT_CITIES.find((c) => c.id === cityId) as City
  const { data, isLoading, error } = useWeather(selectedCity, lang, 'metric')
  
  const timezoneOffset = data?.timezoneOffset || 0
  
  // Calcular día seleccionado en formato YYYY-MM-DD
  const selectedDayString = useSelectedDayString(selectedDay, timezoneOffset)
  
  // Obtener horas para la timeline según el día seleccionado
  const timelineHours = useTimelineHours(
    data?.entries || [],
    timezoneOffset,
    selectedDayString
  )
  
  // Gestionar hora activa (selección y entry memoizada)
  const { activeHourEpoch, selectedHourEntry, onSelectHour } = useActiveHourState(
    timelineHours,
    timezoneOffset,
    selectedDayString
  )
  
  // Calcular días disponibles (memo)
  const availableDaysCount = useAvailableDaysCount(data?.entries || [], timezoneOffset)
  
  // Asegurar que el día seleccionado esté dentro de rango
  useEffect(() => {
    if (selectedDay > availableDaysCount - 1) {
      setSelectedDay(availableDaysCount - 1)
    }
  }, [availableDaysCount, selectedDay])
  
  // Generar opciones de días
  const dayOptions = useDayOptions(timezoneOffset, lang, availableDaysCount)
  
  const cityOptions = useCityOptions(lang)

  return (
    <PageWrapper>
      <Header title={t('appName')} />

      <MainContainer>
        <CitySelectorWrapper data-tour="city-selector">
          <CitySelector 
            label={lang === 'en' ? 'Select a city' : 'Selecciona una ciudad'} 
            value={cityId} 
            options={cityOptions} 
            onChange={(newCityId) => {
              setCityId(newCityId)
              setSelectedDay(0)
            }}
            helperText={lang === 'en' ? 'Real-time weather forecast' : 'Previsión meteorológica en tiempo real'}
          />
        </CitySelectorWrapper>

        {isLoading && <LoadingState />}
        {error && <ErrorState message={t('errorLoading')} />}
        {data && data.entries.length > 0 && (
          <>
            <DaySelectorWrapper data-tour="day-selector">
              <DaySelector 
                options={dayOptions} 
                selectedDay={selectedDay} 
                onChange={setSelectedDay} 
              />
            </DaySelectorWrapper>

            {timelineHours.length > 0 && selectedHourEntry ? (
              <FadeTransition>
                <ContentLayout>
                  <HourlyTimeline 
                    entries={timelineHours} 
                    timezoneOffset={timezoneOffset} 
                    lang={lang}
                    isToday={selectedDay === 0}
                    selectedEpoch={activeHourEpoch || undefined}
                    onSelectHour={onSelectHour}
                  />
                  <HourDetail 
                    entry={selectedHourEntry}
                    timezoneOffset={timezoneOffset}
                    lang={lang}
                  />
                </ContentLayout>
              </FadeTransition>
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
      
      <TourManager enabled={!isLoading && !!data} />
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
  height:100vh;
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

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 640px) {
    gap: 32px;
  }
`

 
