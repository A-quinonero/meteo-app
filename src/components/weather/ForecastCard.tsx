import styled from 'styled-components'
import type { WeatherEntry } from '../../models/weather'
import { formatLocalTime } from '../../helpers/datetime'

const Card = styled.article`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 16px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-height: 200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 12px 28px rgba(59, 130, 246, 0.2);

    &::before {
      opacity: 1;
    }
  }

  @media (min-width: 640px) {
    padding: 18px 14px;
    border-radius: 18px;
    min-height: 220px;
  }

  @media (min-width: 1024px) {
    padding: 20px 16px;
    border-radius: 20px;
    min-height: 240px;
  }
`

const Time = styled.time`
  font-size: 0.8125rem;
  color: #9ca3af;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 0.3px;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-bottom: 12px;
  }
`

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.15));

  @media (min-width: 640px) {
    width: 72px;
    height: 72px;
    margin-bottom: 12px;
  }

  @media (min-width: 1024px) {
    width: 80px;
    height: 80px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Temp = styled.div`
  font-weight: 700;
  font-size: 1.75rem;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 6px;

  @media (min-width: 640px) {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`

const Description = styled.p`
  font-size: 0.75rem;
  color: #d1d5db;
  text-transform: capitalize;
  margin: 0 0 10px 0;
  line-height: 1.3;
  min-height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 640px) {
    font-size: 0.8125rem;
    margin-bottom: 12px;
    min-height: 2.2em;
  }

  @media (min-width: 1024px) {
    font-size: 0.875rem;
  }
`

const MinMaxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 8px;
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  width: 100%;

  @media (min-width: 640px) {
    gap: 8px;
  }
`

const MinMaxItem = styled.span`
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 500;

  strong {
    color: #e5e7eb;
    font-weight: 600;
  }

  @media (min-width: 640px) {
    font-size: 0.75rem;
  }
`

type Props = {
  entry: WeatherEntry
  timezoneOffset: number
}

export function ForecastCard({ entry, timezoneOffset }: Props) {
  const time = formatLocalTime(entry.epoch, timezoneOffset)

  return (
    <Card>
  <Time dateTime={entry.timeISO}>{time}</Time>
      <IconWrapper>
        <img src={entry.icon} alt={entry.description} loading="lazy" />
      </IconWrapper>
      <Temp>{Math.round(entry.temp)}°</Temp>
      <Description>{entry.description}</Description>
      <MinMaxRow>
        <MinMaxItem>
          <strong>{Math.round(entry.tempMin)}°</strong>
        </MinMaxItem>
        <span style={{ color: '#4b5563' }}>•</span>
        <MinMaxItem>
          <strong>{Math.round(entry.tempMax)}°</strong>
        </MinMaxItem>
      </MinMaxRow>
    </Card>
  )
}

export default ForecastCard
