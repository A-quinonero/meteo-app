import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: ${fadeIn} 0.3s ease-out;
`

const Modal = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  padding: 32px 24px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.3);
  animation: ${slideUp} 0.4s ease-out;
  position: relative;

  @media (min-width: 640px) {
    padding: 40px 32px;
  }
`

const Header = styled.div`
  margin-bottom: 24px;
`

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
`

const StepIndicator = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 600;
`

const Content = styled.div`
  margin-bottom: 32px;
`

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #d1d5db;
  margin: 0;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'ghost' }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: #ffffff;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.3);
    
    &:hover {
      background: rgba(59, 130, 246, 0.25);
      border-color: rgba(59, 130, 246, 0.5);
    }
  `}
  
  ${props => props.variant === 'ghost' && `
    background: transparent;
    color: #9ca3af;
    
    &:hover {
      color: #d1d5db;
      background: rgba(255, 255, 255, 0.05);
    }
  `}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`

const LeftActions = styled.div`
  display: flex;
  gap: 8px;
`

const RightActions = styled.div`
  display: flex;
  gap: 8px;
`

type TourStep = {
  title: string
  description: string
}

type Props = {
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingTour({ onComplete, onSkip }: Props) {
  const { t } = useTranslation('common')
  const [currentStep, setCurrentStep] = useState(0)

  const steps: TourStep[] = [
    {
      title: t('tour.welcome'),
      description: t('tour.step1Text'),
    },
    {
      title: t('tour.step2Title'),
      description: t('tour.step2Text'),
    },
    {
      title: t('tour.step3Title'),
      description: t('tour.step3Text'),
    },
    {
      title: t('tour.step4Title'),
      description: t('tour.step4Text'),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isLastStep = currentStep === steps.length - 1
  const step = steps[currentStep]

  return (
    <Overlay>
      <Modal role="dialog" aria-labelledby="tour-title" aria-describedby="tour-description">
        <Header>
          <Title id="tour-title">{step.title}</Title>
          <StepIndicator>
            {currentStep + 1} / {steps.length}
          </StepIndicator>
        </Header>

        <Content>
          <Description id="tour-description">{step.description}</Description>
        </Content>

        <Actions>
          <LeftActions>
            {currentStep > 0 && (
              <Button variant="secondary" onClick={handlePrev}>
                {t('tour.prev')}
              </Button>
            )}
          </LeftActions>

          <RightActions>
            <Button variant="ghost" onClick={onSkip}>
              {t('tour.skip')}
            </Button>
            <Button variant="primary" onClick={handleNext}>
              {isLastStep ? t('tour.finish') : t('tour.next')}
            </Button>
          </RightActions>
        </Actions>
      </Modal>
    </Overlay>
  )
}

export default OnboardingTour
