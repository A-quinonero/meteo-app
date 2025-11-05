import styled from 'styled-components'
import type { WeatherEntry } from '../../models/weather'
import { formatLocalTime, getLocalDayName, getLocalDateShort } from '../../helpers/datetime'

const DetailCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%);
  border-radius: 24px;
  padding: 28px 24px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (min-width: 640px) {
    padding: 32px 28px;
  }

  @media (min-width: 1024px) {
    padding: 36px 32px;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
`

const DayInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DayText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DayName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-transform: capitalize;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`

const DateText = styled.p`
  font-size: 0.9375rem;
  color: #9ca3af;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(59, 130, 246, 0.1);
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`

const TimeLabel = styled.span`
  font-size: 0.8125rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const TimeValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #60a5fa;

  @media (min-width: 640px) {
    font-size: 1.75rem;
  }
`

const MainIcon = styled.div`
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));

  @media (min-width: 640px) {
    width: 72px;
    height: 72px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const MainTemp = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

const TempValue = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;

  @media (min-width: 640px) {
    font-size: 4rem;
  }
`

const Description = styled.p`
  font-size: 1rem;
  color: #d1d5db;
  margin: 12px 0 0;
  text-transform: capitalize;

  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 640px) {
    gap: 20px;
  }
`

const DetailItem = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(59, 130, 246, 0.1);

  @media (min-width: 640px) {
    padding: 18px 20px;
  }
`

const DetailLabel = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;

  @media (min-width: 640px) {
    font-size: 0.8125rem;
  }
`

const DetailValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f3f4f6;

  @media (min-width: 640px) {
    font-size: 1.375rem;
  }
`

type Props = {
  entry: WeatherEntry
  timezoneOffset: number
  lang: 'en' | 'es'
}

export function HourDetail({ entry, timezoneOffset, lang }: Props) {
  const time = formatLocalTime(entry.epoch, timezoneOffset)
  const dayName = getLocalDayName(entry.epoch, timezoneOffset, lang)
  const dateShort = getLocalDateShort(entry.epoch, timezoneOffset, lang)

  const labels = lang === 'en' ? {
    time: 'Time',
    minTemp: 'Min',
    maxTemp: 'Max'
  } : {
    time: 'Hora',
    minTemp: 'Mín',
    maxTemp: 'Máx'
  }

  return (
    <DetailCard>
      <Header>
        <DayInfo>
          <DayText>
            <DayName>{dayName}</DayName>
            <DateText>{dateShort}</DateText>
          </DayText>
          <MainIcon>
            <img src={entry.icon} alt={entry.description} loading="lazy" />
          </MainIcon>
        </DayInfo>
        <TimeDisplay>
          <TimeLabel>{labels.time}</TimeLabel>
          <TimeValue>{time}</TimeValue>
        </TimeDisplay>
      </Header>

      <MainTemp>
        <TempValue>{Math.round(entry.temp)}°</TempValue>
        <Description>{entry.description}</Description>
      </MainTemp>

      <DetailsGrid>
        <DetailItem>
          <DetailLabel>{labels.minTemp}</DetailLabel>
          <DetailValue>{Math.round(entry.tempMin)}°</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>{labels.maxTemp}</DetailLabel>
          <DetailValue>{Math.round(entry.tempMax)}°</DetailValue>
        </DetailItem>
      </DetailsGrid>
    </DetailCard>
  )
}

export default HourDetail

