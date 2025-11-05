import styled from 'styled-components'
import LanguageSwitcher from '../LanguageSwitcher'

const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  background: linear-gradient(to bottom, rgba(10, 14, 39, 0.8) 0%, transparent 100%);

  @media (min-width: 640px) {
    padding: 28px 24px;
  }

  @media (min-width: 1024px) {
    padding: 32px 40px;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  font-weight: 800;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`

type Props = {
  title: string
}

export function Header({ title }: Props) {
  return (
    <HeaderBar>
      <Title>{title}</Title>
      <div data-tour="language-switcher">
        <LanguageSwitcher />
      </div>
    </HeaderBar>
  )
}

export default Header
