import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../i18n'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('es') ? 'es' : 'en'

  return (
    <div style={{ display: 'inline-flex', gap: 8 }}>
      <button
        onClick={() => changeLanguage('en')}
        aria-pressed={current === 'en'}
        style={{ fontWeight: current === 'en' ? 'bold' : 'normal' }}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        aria-pressed={current === 'es'}
        style={{ fontWeight: current === 'es' ? 'bold' : 'normal' }}
      >
        ES
      </button>
    </div>
  )
}

export default LanguageSwitcher
