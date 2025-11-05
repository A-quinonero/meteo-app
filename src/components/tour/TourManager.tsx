import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TourOverlay, { type TourStep } from './TourOverlay'

const TOUR_STORAGE_KEY = 'meteo-app-tour-completed'

type Props = {
  enabled?: boolean
}

export function TourManager({ enabled = true }: Props) {
  const { t } = useTranslation('common')
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    if (!enabled) return

    // Verificar si el usuario ya completó el tour
    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY)
    
    if (!tourCompleted) {
      // Esperar un momento para que la UI cargue
      const timer = setTimeout(() => {
        setShowTour(true)
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [enabled])

  const handleComplete = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true')
    setShowTour(false)
  }

  const handleSkip = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true')
    setShowTour(false)
  }

  // Definir los pasos del tour con selectores específicos
  const steps: TourStep[] = [
    {
      selector: '[data-tour="language-switcher"]',
      title: t('tour.step2Title'),
      text: t('tour.step2Text'),
      position: 'bottom',
    },
    {
      selector: '[data-tour="city-selector"]',
      title: t('tour.step1Title'),
      text: t('tour.step1Text'),
      position: 'bottom',
    },
    {
      selector: '[data-tour="day-selector"]',
      title: t('tour.step3Title'),
      text: t('tour.step3Text'),
      position: 'bottom',
    },
    {
      selector: '[data-tour="weather-summary"]',
      title: t('tour.step4Title'),
      text: t('tour.step4Text'),
      position: 'right',
    },
  ]

  if (!showTour) return null

  return (
    <TourOverlay
      steps={steps}
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  )
}

export default TourManager
