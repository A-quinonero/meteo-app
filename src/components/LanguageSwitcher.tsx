import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../i18n'

const Container = styled.div`
  display: inline-flex;
  gap: 6px;
  background: rgba(30, 41, 59, 0.6);
  padding: 6px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(8px);
`

const Button = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;
  background: ${props =>
    props.isActive ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent'};
  color: ${props => (props.isActive ? '#ffffff' : '#9ca3af')};
  box-shadow: ${props => (props.isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none')};

  &:hover {
    background: ${props =>
      props.isActive
        ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
        : 'rgba(59, 130, 246, 0.1)'};
    color: ${props => (props.isActive ? '#ffffff' : '#e5e7eb')};
  }

  &:active {
    transform: scale(0.96);
  }

  @media (min-width: 1024px) {
    padding: 11px 22px;
    font-size: 0.9375rem;
  }
`

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('es') ? 'es' : 'en'

  return (
    <Container role="group" aria-label="Language selector" data-tour="language-switcher">
      <Button
        isActive={current === 'en'}
        onClick={() => changeLanguage('en')}
        aria-pressed={current === 'en'}
        title="Switch to English"
      >
        EN
      </Button>
      <Button
        isActive={current === 'es'}
        onClick={() => changeLanguage('es')}
        aria-pressed={current === 'es'}
        title="Cambiar a Español"
      >
        ES
      </Button>
    </Container>
  )
}

export default LanguageSwitcher
