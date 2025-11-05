import styled from 'styled-components'
import type { WeatherEntry } from '../../models/weather'
import ForecastCard from './ForecastCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 16px;
`

type Props = {
  entries: WeatherEntry[]
  lang: 'en' | 'es'
}

export function ForecastGrid({ entries, lang }: Props) {
  return (
    <Grid>
      {entries.map((e) => (
        <ForecastCard key={e.epoch} entry={e} lang={lang} />
      ))}
    </Grid>
  )
}

export default ForecastGrid
