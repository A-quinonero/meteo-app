import styled from 'styled-components'
import LanguageSwitcher from '../LanguageSwitcher'

const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
`

type Props = {
  title: string
}

export function Header({ title }: Props) {
  return (
    <Bar>
      <Title>{title}</Title>
      <LanguageSwitcher />
    </Bar>
  )
}

export default Header
