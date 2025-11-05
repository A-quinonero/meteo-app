import styled from 'styled-components'
import type { WeatherEntry } from '../../models/weather'

const Card = styled.div`
  padding: 12px;
  background: #111214;
  border: 1px solid #26272b;
  border-radius: 10px;
`

const Time = styled.div`
  font-size: 12px;
  opacity: 0.7;
`

const Temp = styled.div`
  font-weight: 600;
  font-size: 18px;
`

const Desc = styled.div`
  font-size: 12px;
`

const MinMax = styled.div`
  font-size: 12px;
  opacity: 0.8;
`

type Props = {
  entry: WeatherEntry
  lang: 'en' | 'es'
}

export function ForecastCard({ entry, lang }: Props) {
  return (
    <Card>
      <img src={entry.icon} alt="" />
      <Time>{new Date(entry.timeISO).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}</Time>
      <Temp>{Math.round(entry.temp)}°</Temp>
      <Desc>{entry.description}</Desc>
      <MinMax>
        min {Math.round(entry.tempMin)}° • max {Math.round(entry.tempMax)}°
      </MinMax>
    </Card>
  )
}

export default ForecastCard
