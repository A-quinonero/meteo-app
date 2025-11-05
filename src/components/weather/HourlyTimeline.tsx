import styled from 'styled-components'
import { useMemo } from 'react'
import type { WeatherEntry } from '../../models/weather'
import { formatLocalTime, getLocalDateShort } from '../../helpers/datetime'

const Container = styled.div`
  width: 100%;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%);
  border-radius: 20px;
  padding: 20px 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 24px;
  
  /* Ocultar scrollbar pero permitir scroll */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    padding: 24px 20px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 32px;
  }
`

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;

  @media (min-width: 640px) {
    font-size: 0.9375rem;
    margin-bottom: 20px;
  }
`

const Timeline = styled.div`
  display: flex;
  gap: 24px;
  min-width: min-content;

  @media (min-width: 640px) {
    gap: 32px;
  }

  @media (min-width: 1024px) {
    gap: 40px;
  }
`

const TimeSlot = styled.div<{ isNow?: boolean; isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 60px;
  position: relative;
  transition: transform 0.2s ease, opacity 0.2s ease;
  cursor: pointer;
  opacity: ${props => props.isSelected ? 1 : 0.7};

  ${props => props.isNow && `
    &::before {
      content: '';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background: #3b82f6;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(59, 130, 246, 0.8);
    }
  `}

  ${props => props.isSelected && `
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
      border-radius: 2px;
    }
  `}

  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`

const Time = styled.div<{ isNow?: boolean; isSelected?: boolean }>`
  font-size: 0.8125rem;
  font-weight: ${props => (props.isNow || props.isSelected) ? '700' : '500'};
  color: ${props => (props.isNow || props.isSelected) ? '#60a5fa' : '#9ca3af'};
  letter-spacing: 0.3px;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15));

  @media (min-width: 640px) {
    width: 48px;
    height: 48px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Temp = styled.div<{ isNow?: boolean; isSelected?: boolean }>`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => (props.isNow || props.isSelected) ? '#ffffff' : '#f3f4f6'};
  background: ${props => (props.isNow || props.isSelected)
    ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
    : 'transparent'
  };
  ${props => (props.isNow || props.isSelected) && `
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`

type Props = {
  entries: WeatherEntry[]
  timezoneOffset: number
  lang: 'en' | 'es'
  selectedEpoch?: number
  onSelectHour?: (epoch: number) => void
  isToday?: boolean
}

export function HourlyTimeline({ entries, timezoneOffset, lang, selectedEpoch, onSelectHour, isToday = false }: Props) {
  // Tomar solo las próximas 12 horas para la línea temporal
  const timelineEntries = entries.slice(0, 12)

  // Calcular la hora actual en la zona horaria local
  const nowUtc = Math.floor(Date.now() / 1000)
  const nowLocal = nowUtc + timezoneOffset

  // Título memoizado: hoy → Próximas horas | futuro → Horas del <día>
  const title = useMemo(() => {
    if (isToday) return lang === 'en' ? 'Next hours' : 'Próximas horas'
    const first = timelineEntries[0]
    if (!first) return lang === 'en' ? 'Hours' : 'Horas'
    const day = getLocalDateShort(first.epoch, timezoneOffset, lang)
    return lang === 'en' ? `Hours for ${day}` : `Horas del ${day}`
  }, [isToday, lang, timelineEntries, timezoneOffset])

  return (
    <Container>
      <Title>{title}</Title>
      <Timeline>
        {timelineEntries.map((entry) => {
          const time = formatLocalTime(entry.epoch, timezoneOffset)
          const entryLocal = entry.epoch + timezoneOffset
          // La hora en curso es el bloque donde now está dentro de [entryLocal, entryLocal + 3600)
          const isNow = nowLocal >= entryLocal && nowLocal < (entryLocal + 3600)
          const isSelected = selectedEpoch === entry.epoch

          return (
            <TimeSlot 
              key={entry.epoch} 
              isNow={isNow} 
              isSelected={isSelected}
              onClick={() => onSelectHour?.(entry.epoch)}
            >
              <Time isNow={isNow} isSelected={isSelected}>{time}</Time>
              <IconWrapper>
                <img src={entry.icon} alt={entry.description} loading="lazy" />
              </IconWrapper>
              <Temp isNow={isNow} isSelected={isSelected}>{Math.round(entry.temp)}°</Temp>
            </TimeSlot>
          )
        })}
      </Timeline>
    </Container>
  )
}

export default HourlyTimeline
