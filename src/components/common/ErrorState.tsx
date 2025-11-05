import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%);
  border: 1.5px solid #ef4444;
  border-radius: 10px;
  text-align: center;
  animation: ${slideIn} 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.1);

  @media (max-width: 640px) {
    padding: 16px 20px;
  }
`

const Title = styled.h3`
  color: #fca5a5;
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before {
    content: '⚠️';
    font-size: 1.25rem;
  }
`

const Message = styled.p`
  color: #fed7d7;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.4;
`

type Props = {
  title?: string
  message: string
}

export function ErrorState({ title = 'Error', message }: Props) {
  return (
    <Container role="alert">
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Container>
  )
}

export default ErrorState
