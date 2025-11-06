import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 400px;
`

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #9ca3af;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
`

const HelperText = styled.p`
  margin: 8px 0 0 0;
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.2px;
`

const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #60a5fa;
    pointer-events: none;
  }
`

const Select = styled.select`
  width: 100%;
  appearance: none;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  color: #f3f4f6;
  font-size: 1rem;
  font-weight: 600;
  padding: 16px 44px 16px 20px;
  cursor: pointer;
  transition: all 250ms ease;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 100%);
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.15),
      0 4px 6px -1px rgba(0, 0, 0, 0.2);
  }

  option {
    background: #1e293b;
    color: #f3f4f6;
    padding: 12px;
  }

  @media (min-width: 1024px) {
    font-size: 1.125rem;
    padding: 18px 48px 18px 24px;
  }
`

export type CityOption = { id: string; value: string; label: string }

type Props = {
  label: string
  value: string
  options: CityOption[]
  onChange: (value: string) => void
  helperText?: string
}

export function CitySelector({ label, value, options, onChange, helperText }: Props) {
  return (
    <Container data-tour="city-selector">
      <Label htmlFor="city-select">{label}</Label>
      <SelectWrapper>
        <Select
          id="city-select"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={label}
        >
          {options.map(o => (
            <option key={o.id} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </SelectWrapper>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Container>
  )
}

export default CitySelector
