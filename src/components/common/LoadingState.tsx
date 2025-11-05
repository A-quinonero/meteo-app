import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const Skeleton = styled.div`
  background: linear-gradient(
    90deg,
    rgba(30, 41, 59, 0.6) 0%,
    rgba(59, 130, 246, 0.1) 50%,
    rgba(30, 41, 59, 0.6) 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SummarySkeleton = styled(Skeleton)`
  height: 280px;
  border-radius: 24px;

  @media (min-width: 768px) {
    height: 240px;
  }

  @media (min-width: 1024px) {
    height: 260px;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 20px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 24px;
  }
`

const CardSkeleton = styled(Skeleton)`
  height: 200px;
  border-radius: 16px;

  @media (min-width: 640px) {
    height: 220px;
    border-radius: 18px;
  }

  @media (min-width: 1024px) {
    height: 240px;
    border-radius: 20px;
  }
`

export function LoadingState() {
  return (
    <Container role="status" aria-live="polite" aria-label="Loading weather data">
      <SummarySkeleton />
      <GridContainer>
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </GridContainer>
    </Container>
  )
}

export default LoadingState
