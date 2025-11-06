import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

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

const Skeleton = styled.div`
  background: linear-gradient(
    90deg,
    rgba(30, 41, 59, 0.6) 0%,
    rgba(59, 130, 246, 0.15) 50%,
    rgba(30, 41, 59, 0.6) 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(59, 130, 246, 0.05) 50%,
      transparent 100%
    );
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeIn} 0.4s ease-out;
`

const SummarySkeletonWrapper = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 640px) {
    padding: 36px 28px;
  }

  @media (min-width: 1024px) {
    padding: 40px 32px;
  }
`

const SkeletonLine = styled(Skeleton)<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  border-radius: 12px;
`

const SkeletonCircle = styled(Skeleton)<{ size?: string }>`
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  border-radius: 50%;
  margin: 0 auto;
`

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const MinMaxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const MinMaxBox = styled.div`
  background: rgba(59, 130, 246, 0.08);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media (min-width: 640px) {
    padding: 18px;
  }

  @media (min-width: 1024px) {
    padding: 20px;
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
      <SummarySkeletonWrapper>
        <SkeletonLine width="60%" height="24px" />
        <SkeletonLine width="40%" height="14px" />

        <SummaryContent>
          <SkeletonCircle size="120px" />
          <SkeletonLine width="80px" height="48px" />
          <SkeletonLine width="120px" height="16px" />
        </SummaryContent>

        <MinMaxGrid>
          <MinMaxBox>
            <SkeletonLine width="60px" height="12px" />
            <SkeletonLine width="50px" height="32px" />
          </MinMaxBox>
          <MinMaxBox>
            <SkeletonLine width="60px" height="12px" />
            <SkeletonLine width="50px" height="32px" />
          </MinMaxBox>
        </MinMaxGrid>
      </SummarySkeletonWrapper>

      <GridContainer>
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </GridContainer>
    </Container>
  )
}

export default LoadingState
