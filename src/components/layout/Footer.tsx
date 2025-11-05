import styled from 'styled-components'

const FooterBar = styled.footer`
  border-top: 1px solid rgba(59, 130, 246, 0.15);
  padding: 24px 16px;
  text-align: center;
  background: linear-gradient(to top, rgba(10, 14, 39, 0.8) 0%, transparent 100%);

  @media (min-width: 640px) {
    padding: 28px 24px;
  }
`

const FooterContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const FooterText = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: #6b7280;
  font-weight: 500;
`

const FooterLink = styled.a`
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  transition: color 200ms ease;

  &:hover {
    color: #93c5fd;
    text-decoration: underline;
  }
`

type Props = {
  lang: 'en' | 'es'
}

export function Footer({ lang }: Props) {
  return (
    <FooterBar>
      <FooterContent>
        <FooterText>
          {lang === 'en' ? 'Weather data provided by' : 'Datos meteorológicos por'}{' '}
          <FooterLink href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
            OpenWeather
          </FooterLink>
        </FooterText>
        <FooterText>
          {lang === 'en' ? 'Updated every 5 minutes' : 'Actualizado cada 5 minutos'}
        </FooterText>
      </FooterContent>
    </FooterBar>
  )
}

export default Footer
