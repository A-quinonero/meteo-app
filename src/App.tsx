import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_CITIES, type City } from './config/constants'
import { useWeather } from './hooks/useWeather'
import type { WeatherEntry } from './models/weather'
import Header from './components/layout/Header'
import CitySelector, { type CityOption } from './components/common/CitySelector'
import ForecastGrid from './components/weather/ForecastGrid'
import styled from 'styled-components'

export default function App() {
  const { t, i18n } = useTranslation('common')
  const lang = (i18n.language?.startsWith('es') ? 'es' : 'en') as 'en' | 'es'
  const [cityId, setCityId] = useState<string>(DEFAULT_CITIES[0].id)
  const selectedCity = DEFAULT_CITIES.find((c) => c.id === cityId) as City
  const { data, isLoading, error } = useWeather(selectedCity, lang, 'metric')

  const cityOptions: CityOption[] = DEFAULT_CITIES.map((c) => ({ id: c.id, value: c.id, label: c.label[lang] }))

  return (
    <Page>
      <Header title={t('appName')} />

  <CitySelector label={t('city')} value={cityId} options={cityOptions} onChange={setCityId} />

      <Section>
        {isLoading && <p>{t('loading')}</p>}
        {error && <p style={{ color: 'red' }}>{t('errorLoading')}</p>}
        {data && (
          <div>
            <h2>{selectedCity.label[lang]}</h2>
            <ForecastGrid entries={data.entries as WeatherEntry[]} lang={lang} />
          </div>
        )}
      </Section>
    </Page>
  )
}

const Page = styled.div`
  padding: 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
`

const Section = styled.section`
  margin-top: 16px;
`
 
