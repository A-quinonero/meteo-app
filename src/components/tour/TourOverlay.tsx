import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  animation: ${fadeIn} 0.3s ease-out;
  /* Capturamos clicks para evitar interacción con el fondo,
     pero permitimos scroll (no bloqueamos overflow del body si el paso lo permite). */
  pointer-events: auto;
  background: transparent;
`

const Spotlight = styled.div<{ top: number; left: number; width: number; height: number }>`
  position: fixed;
  top: ${props => props.top - 4}px;
  left: ${props => props.left - 4}px;
  width: ${props => props.width + 8}px;
  height: ${props => props.height + 8}px;
  border: 3px solid #3b82f6;
  border-radius: 16px;
  box-shadow:
    0 0 0 9999px rgba(10, 14, 39, 0.9),
    0 0 40px rgba(59, 130, 246, 0.8),
    inset 0 0 0 1px rgba(59, 130, 246, 0.3);
  z-index: 9999;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.3s ease-out;
`

const Tooltip = styled.div<{ position: 'top' | 'bottom' | 'left' | 'right' }>`
  position: fixed;
  z-index: 10000;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 2px solid rgba(59, 130, 246, 0.4);
  border-radius: 16px;
  padding: 24px;
  max-width: 360px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  animation: ${slideUp} 0.4s ease-out;
  pointer-events: auto;

  @media (max-width: 640px) {
    padding: 18px;
    border-radius: 12px;
    font-size: 0.9rem;
  }
`

const TooltipTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #f3f4f6;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const TooltipText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #d1d5db;
  margin: 0 0 20px 0;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props =>
    props.variant === 'primary'
      ? `
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
    }
  `
      : `
    background: rgba(59, 130, 246, 0.1);
    color: #9ca3af;
    border: 1px solid rgba(59, 130, 246, 0.3);
    
    &:hover {
      background: rgba(59, 130, 246, 0.2);
      color: #d1d5db;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SkipButton = styled.button`
  background: transparent;
  border: none;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 8px;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: #9ca3af;
  }
`

const Progress = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

const ProgressDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => (props.active ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)')};
  transition: all 0.3s ease;
`

export type TourStep = {
  selector?: string
  title: string
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  allowScroll?: boolean
}

type Props = {
  steps: TourStep[]
  onComplete: () => void
  onSkip: () => void
}

export function TourOverlay({ steps, onComplete, onSkip }: Props) {
  const { t } = useTranslation('common')
  const [currentStep, setCurrentStep] = useState(0)
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})

  const updateSpotlight = useCallback(() => {
    if (currentStep >= steps.length) return

    const step = steps[currentStep]

    // Remover clase del elemento anterior
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight')
    })

    // Si no hay selector (paso de bienvenida), centrar el tooltip y no mostrar spotlight
    if (!step.selector) {
      setSpotlightRect(null)

      const isMobile = window.innerWidth <= 640
      if (isMobile) {
        setTooltipStyle({
          top: '50%',
          left: '16px',
          right: '16px',
          transform: 'translateY(-50%)',
          width: 'auto',
          maxWidth: 'none',
        })
      } else {
        setTooltipStyle({
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        })
      }
      return
    }

    const element = document.querySelector(step.selector)

    if (element) {
      // Añadir clase para elevar z-index
      element.classList.add('tour-highlight')

      const rect = element.getBoundingClientRect()
      setSpotlightRect(rect)

      // Calcular posición del tooltip con ajuste automático para viewport
      const isMobile = window.innerWidth <= 640
      const position = step.position || 'bottom'
      const tooltipPadding = isMobile ? 12 : 20
      const tooltipWidth = isMobile ? window.innerWidth - 32 : 360
      const tooltipHeight = 300 // estimado más conservador (evita corte en desktop)
      const margin = 16

      let style: React.CSSProperties = {}
      let finalPosition = position

      // En mobile, usar posicionamiento fixed con left/right para ocupar el ancho completo
      if (isMobile) {
        const spaceBottom = window.innerHeight - rect.bottom
        const spaceTop = rect.top

        // Priorizar bottom si hay más espacio allí
        if (spaceBottom >= tooltipHeight + tooltipPadding + margin) {
          // Posicionar debajo del elemento
          style = {
            top: `${rect.bottom + tooltipPadding}px`,
            left: '16px',
            right: '16px',
            width: 'auto',
            maxWidth: 'none',
          }
        } else if (spaceTop >= tooltipHeight + tooltipPadding + margin) {
          // Posicionar arriba del elemento
          style = {
            bottom: `${window.innerHeight - rect.top + tooltipPadding}px`,
            left: '16px',
            right: '16px',
            width: 'auto',
            maxWidth: 'none',
          }
        } else {
          // Si no hay espacio suficiente arriba o abajo, centrar verticalmente
          style = {
            top: '50%',
            left: '16px',
            right: '16px',
            transform: 'translateY(-50%)',
            width: 'auto',
            maxWidth: 'none',
          }
        }
        setTooltipStyle(style)

        // Scroll para centrar el elemento
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        return
      }

      // Detectar si hay espacio suficiente en la posición preferida (desktop)
      const spaceBottom = window.innerHeight - rect.bottom - tooltipPadding
      const spaceTop = rect.top - tooltipPadding
      const spaceRight = window.innerWidth - rect.right - tooltipPadding
      const spaceLeft = rect.left - tooltipPadding

      // Ajustar posición si no hay espacio
      if (position === 'bottom' && spaceBottom < tooltipHeight) {
        if (spaceTop > tooltipHeight) {
          finalPosition = 'top'
        }
      } else if (position === 'top' && spaceTop < tooltipHeight) {
        if (spaceBottom > tooltipHeight) {
          finalPosition = 'bottom'
        }
      } else if (position === 'right' && spaceRight < tooltipWidth) {
        if (spaceLeft > tooltipWidth) {
          finalPosition = 'left'
        } else {
          finalPosition = 'bottom'
        }
      } else if (position === 'left' && spaceLeft < tooltipWidth) {
        if (spaceRight > tooltipWidth) {
          finalPosition = 'right'
        } else {
          finalPosition = 'bottom'
        }
      }

      switch (finalPosition) {
        case 'bottom':
          style = {
            top: rect.bottom + tooltipPadding,
            left: Math.max(
              margin,
              Math.min(rect.left + rect.width / 2, window.innerWidth - tooltipWidth / 2 - margin),
            ),
            transform: 'translateX(-50%)',
          }
          break
        case 'top':
          style = {
            bottom: window.innerHeight - rect.top + tooltipPadding,
            left: Math.max(
              margin,
              Math.min(rect.left + rect.width / 2, window.innerWidth - tooltipWidth / 2 - margin),
            ),
            transform: 'translateX(-50%)',
          }
          break
        case 'right':
          style = {
            top: Math.max(
              margin,
              Math.min(rect.top + rect.height / 2, window.innerHeight - tooltipHeight / 2 - margin),
            ),
            left: rect.right + tooltipPadding,
            transform: 'translateY(-50%)',
          }
          break
        case 'left':
          style = {
            top: Math.max(
              margin,
              Math.min(rect.top + rect.height / 2, window.innerHeight - tooltipHeight / 2 - margin),
            ),
            right: window.innerWidth - rect.left + tooltipPadding,
            transform: 'translateY(-50%)',
          }
          break
      }

      setTooltipStyle(style)

      // Scroll suave al elemento
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [currentStep, steps])

  useEffect(() => {
    updateSpotlight()

    // Gestionar scroll del body según paso
    const originalOverflow = document.body.style.overflow
    const step = steps[currentStep]
    const shouldBlockScroll = !(step && step.allowScroll)
    if (shouldBlockScroll) {
      document.body.style.overflow = 'hidden'
    }

    // Reposicionar en resize/scroll
    let ticking = false
    const handleRecalc = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          updateSpotlight()
          ticking = false
        })
      }
    }
    window.addEventListener('resize', handleRecalc, { passive: true })
    window.addEventListener('scroll', handleRecalc, { passive: true })

    // Observar cambios del elemento objetivo (ResizeObserver)
    const stepEl = step?.selector ? document.querySelector(step.selector) : null
    let ro: ResizeObserver | undefined
    if (stepEl && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => handleRecalc())
      ro.observe(stepEl as Element)
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleRecalc)
      window.removeEventListener('scroll', handleRecalc)
      if (ro) ro.disconnect()
      document.body.style.overflow = originalOverflow
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight')
      })
    }
  }, [updateSpotlight, steps, currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (currentStep >= steps.length) return null

  const step = steps[currentStep]

  return (
    <>
      {/* Capturamos clicks para evitar interactuar con el fondo */}
      <Overlay onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()} />
      {spotlightRect && (
        <Spotlight
          top={spotlightRect.top}
          left={spotlightRect.left}
          width={spotlightRect.width}
          height={spotlightRect.height}
        />
      )}
      <Tooltip style={tooltipStyle} position={step.position || 'bottom'}>
        <Progress>
          {steps.map((_, index) => (
            <ProgressDot key={index} active={index === currentStep} />
          ))}
        </Progress>
        <TooltipTitle>{step.title}</TooltipTitle>
        <TooltipText>{step.text}</TooltipText>
        <ButtonGroup>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" onClick={handlePrev} disabled={currentStep === 0}>
              {t('tour.prev')}
            </Button>
            <Button variant="primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? t('tour.finish') : t('tour.next')}
            </Button>
          </div>
          <SkipButton onClick={onSkip}>{t('tour.skip')}</SkipButton>
        </ButtonGroup>
      </Tooltip>
    </>
  )
}

export default TourOverlay
