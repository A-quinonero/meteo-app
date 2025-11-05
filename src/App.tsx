import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_CITIES } from './config/constants'
import { useWeather } from './hooks/useWeather'
import type { WeatherEntry } from './models/weather'
import LanguageSwitcher from './components/LanguageSwitcher'

export default function App() {
  const { t, i18n } = useTranslation('common')
  const lang = (i18n.language?.startsWith('es') ? 'es' : 'en') as 'en' | 'es'
  const [city, setCity] = useState<string>(DEFAULT_CITIES[0].q)
  const { data, isLoading, error } = useWeather(city, lang, 'metric')

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>{t('appName')}</h1>
        <LanguageSwitcher />
      </header>

      <div style={{ marginTop: 12 }}>
  <label>{t('city')}: </label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {DEFAULT_CITIES.map((c: typeof DEFAULT_CITIES[number]) => (
            <option key={c.id} value={c.q}>
              {c.label[lang]}
            </option>
          ))}
        </select>
      </div>

      <section style={{ marginTop: 16 }}>
  {isLoading && <p>{t('loading')}</p>}
  {error && <p style={{ color: 'red' }}>{t('errorLoading')}</p>}
        {data && (
          <div>
            <h2>
              {data.city}, {data.country}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {data.entries.map((entry: WeatherEntry) => (
                <div key={entry.epoch} style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
                  <img src={entry.icon} alt="" />
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {new Date(entry.timeISO).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div style={{ fontWeight: 600 }}>{Math.round(entry.temp)}°</div>
                  <div style={{ fontSize: 12 }}>{entry.description}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>min {Math.round(entry.tempMin)}° • max {Math.round(entry.tempMax)}°</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
 
