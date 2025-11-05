import styled from 'styled-components'
import type { WeatherEntry } from '../../models/weather'
import ForecastCard from './ForecastCard'

const Section = styled.section``

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;

  @media (min-width: 1024px) {
    margin-bottom: 24px;
  }
`

const Title = styled.h3`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: #f3f4f6;
  margin: 0;
  font-weight: 700;
`

const InfoBadge = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  background: rgba(59, 130, 246, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 20px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 24px;
  }
`

type Props = {
  entries: WeatherEntry[]
  lang: 'en' | 'es'
  timezoneOffset: number
}

export function ForecastGrid({ entries, lang, timezoneOffset }: Props) {
  const count = entries.length
  const badge = lang === 'en' ? `${count} hours` : `${count} horas`
  
  return (
    <Section>
      <TitleRow>
        <Title>{lang === 'en' ? 'Hourly Forecast' : 'Previsión por Horas'}</Title>
        <InfoBadge>{badge}</InfoBadge>
      </TitleRow>
      <Grid>
        {entries.map((e) => (
          <ForecastCard key={e.epoch} entry={e} timezoneOffset={timezoneOffset} />
        ))}
      </Grid>
    </Section>
  )
}

export default ForecastGrid
