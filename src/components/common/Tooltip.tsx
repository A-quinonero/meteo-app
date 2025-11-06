import { useState } from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

const TooltipTrigger = styled.div`
  cursor: help;
  display: inline-flex;
  align-items: center;
`

const TooltipContent = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.98);
  color: #f3f4f6;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.8125rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 200ms ease;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(15, 23, 42, 0.98);
  }
`

type Props = {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: Props) {
  const [show, setShow] = useState(false)

  return (
    <TooltipContainer
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent show={show} role="tooltip">
        {content}
      </TooltipContent>
    </TooltipContainer>
  )
}

export default Tooltip
