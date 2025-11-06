import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.3) transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.3);
    border-radius: 3px;
  }

  @media (min-width: 640px) {
    justify-content: center;
    gap: 10px;
  }
`

const DayButton = styled.button<{ isActive: boolean }>`
  flex-shrink: 0;
  padding: 12px 16px;
  border: 1px solid ${props => (props.isActive ? '#3b82f6' : 'rgba(59, 130, 246, 0.2)')};
  border-radius: 12px;
  background: ${props =>
    props.isActive
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)'
      : 'rgba(30, 41, 59, 0.6)'};
  color: ${props => (props.isActive ? '#60a5fa' : '#9ca3af')};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;
  min-width: 100px;
  text-align: center;

  &:hover {
    border-color: #3b82f6;
    background: ${props =>
      props.isActive
        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.2) 100%)'
        : 'rgba(30, 41, 59, 0.8)'};
    color: ${props => (props.isActive ? '#93c5fd' : '#d1d5db')};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 640px) {
    padding: 14px 20px;
    font-size: 0.875rem;
    min-width: 110px;
  }

  @media (min-width: 1024px) {
    padding: 16px 24px;
    min-width: 120px;
  }
`

const DayName = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.3px;
`

const DayDate = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.8;

  @media (min-width: 640px) {
    font-size: 0.75rem;
  }
`

export type DayOption = {
  value: number // día offset (0 = hoy, 1 = mañana, etc.)
  label: string // "Today", "Hoy", etc.
  date: string // "5 Nov"
}

type Props = {
  options: DayOption[]
  selectedDay: number
  onChange: (day: number) => void
}

export function DaySelector({ options, selectedDay, onChange }: Props) {
  return (
    <Container role="tablist" aria-label="Day selector" data-tour="day-selector">
      {options.map(option => (
        <DayButton
          key={option.value}
          isActive={selectedDay === option.value}
          onClick={() => onChange(option.value)}
          role="tab"
          aria-selected={selectedDay === option.value}
          aria-label={`${option.label}, ${option.date}`}
        >
          <DayName>{option.label}</DayName>
          <DayDate>{option.date}</DayDate>
        </DayButton>
      ))}
    </Container>
  )
}

export default DaySelector
