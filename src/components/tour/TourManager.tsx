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
    // 1) Idioma primero
    {
      selector: '[data-tour="language-switcher"]',
      title: t('tour.step2Title'),
      text: t('tour.step2Text'),
      position: 'bottom',
    },
    // 2) Selector de ciudad
    {
      selector: '[data-tour="city-selector"]',
      title: t('tour.step1Title'),
      text: t('tour.step1Text'),
      position: 'bottom',
    },
    // 3) Selector de día
    {
      selector: '[data-tour="day-selector"]',
      title: t('tour.step3Title'),
      text: t('tour.step3Text'),
      position: 'bottom',
    },
    // 4) Timeline interactiva
    {
      selector: '[data-tour="hourly-timeline"]',
      title: t('tour.stepTimelineTitle'),
      text: t('tour.stepTimelineText'),
      position: 'bottom',
    },
    // 5) Detalle de la hora seleccionada
    {
      selector: '[data-tour="hour-detail"]',
      title: t('tour.stepDetailTitle'),
      text: t('tour.stepDetailText'),
      position: 'top',
      // Permite scroll en este paso para que el usuario pueda desplazarse sin perder el spotlight
      allowScroll: true,
    },
  ]

  if (!showTour) return null

  return <TourOverlay steps={steps} onComplete={handleComplete} onSkip={handleSkip} />
}

export default TourManager
