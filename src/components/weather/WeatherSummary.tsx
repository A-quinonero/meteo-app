import styled from 'styled-components'
import type { WeatherEntry } from '../../models/weather'
import { formatLocalDateTime } from '../../helpers/datetime'

const Card = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.2);

  @media (min-width: 640px) {
    padding: 36px 28px;
  }

  @media (min-width: 1024px) {
    padding: 40px 32px;
    position: sticky;
    top: 24px;
  }
`

const CityName = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 700;
  color: #f3f4f6;
  margin: 0 0 8px 0;
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
    margin-bottom: 8px;
  }
`

const UpdateTime = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0 0 24px 0;
  text-align: center;
  font-weight: 500;

  @media (min-width: 1024px) {
    text-align: left;
    margin-bottom: 24px;
  }
`

const MainGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: 2fr 1fr;
    gap: 28px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const CurrentWeather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 640px) {
    align-items: flex-start;
    text-align: left;
  }

  @media (min-width: 1024px) {
    align-items: center;
    text-align: center;
  }
`

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
  filter: drop-shadow(0 10px 25px rgba(59, 130, 246, 0.3));

  @media (min-width: 1024px) {
    width: 140px;
    height: 140px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const CurrentTemp = styled.div`
  font-size: clamp(3.5rem, 12vw, 5rem);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
`

const Description = styled.div`
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: #d1d5db;
  text-transform: capitalize;
  font-weight: 500;
`

const MinMaxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const MinMaxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);

  @media (min-width: 640px) {
    align-items: flex-start;
    padding: 18px;
  }

  @media (min-width: 1024px) {
    align-items: center;
    padding: 20px;
  }
`

const MinMaxLabel = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 8px;
`

const MinMaxValue = styled.div`
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

type Props = {
  current: WeatherEntry
  dailyMin: number
  dailyMax: number
  lang: 'en' | 'es'
  cityName: string
  timezoneOffset: number
}

export function WeatherSummary({
  current,
  dailyMin,
  dailyMax,
  lang,
  cityName,
  timezoneOffset,
}: Props) {
  const updateTime = formatLocalDateTime(current.epoch, timezoneOffset, lang)

  return (
    <Card data-tour="weather-summary">
      <CityName>{cityName}</CityName>
      <UpdateTime>
        {lang === 'en' ? 'Updated at' : 'Actualizado a las'} {updateTime}
      </UpdateTime>
      <MainGrid>
        <CurrentWeather>
          <IconWrapper>
            <img src={current.icon} alt={current.description} />
          </IconWrapper>
          <CurrentTemp>{Math.round(current.temp)}°</CurrentTemp>
          <Description>{current.description}</Description>
        </CurrentWeather>

        <MinMaxContainer>
          <MinMaxItem>
            <MinMaxLabel>{lang === 'en' ? 'Today Min' : 'Mín Hoy'}</MinMaxLabel>
            <MinMaxValue>{Math.round(dailyMin)}°</MinMaxValue>
          </MinMaxItem>
          <MinMaxItem>
            <MinMaxLabel>{lang === 'en' ? 'Today Max' : 'Máx Hoy'}</MinMaxLabel>
            <MinMaxValue>{Math.round(dailyMax)}°</MinMaxValue>
          </MinMaxItem>
        </MinMaxContainer>
      </MainGrid>
    </Card>
  )
}

export default WeatherSummary
