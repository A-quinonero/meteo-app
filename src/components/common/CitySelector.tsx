import styled from 'styled-components'

const Group = styled.div`
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const Select = styled.select`
  background: #111214;
  color: #f3f4f6;
  border: 1px solid #26272b;
  border-radius: 8px;
  padding: 8px 10px;
`

const Label = styled.label`
  font-size: 14px;
  color: #9ca3af;
`

export type CityOption = { id: string; value: string; label: string }

type Props = {
  label: string
  value: string
  options: CityOption[]
  onChange: (value: string) => void
}

export function CitySelector({ label, value, options, onChange }: Props) {
  return (
    <Group>
      <Label>{label}:</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.id} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </Group>
  )
}

export default CitySelector
