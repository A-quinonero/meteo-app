import type { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Wrapper = styled.div<{ delay?: number }>`
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay || 0}ms;
  opacity: 0;
`

type Props = {
  children: ReactNode
  delay?: number
}

/**
 * Componente de transición fade-in con delay opcional
 */
export function FadeTransition({ children, delay = 0 }: Props) {
  return <Wrapper delay={delay}>{children}</Wrapper>
}

export default FadeTransition
