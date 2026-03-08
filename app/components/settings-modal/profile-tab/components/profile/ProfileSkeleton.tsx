import styled, { keyframes } from "styled-components";

const hexToRGBA = (hex: string, opacity: number) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
const shimmer = keyframes`
  0% {
    background-position: -25rem 0;
  }
  100% {
    background-position: 25rem 0;
  }
`;
export const SkeletonBase = styled.div`
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => hexToRGBA(theme.highlight, 0.25)} 25%,
    ${({ theme }) => hexToRGBA(theme.highlight, 0.6)} 37%,
    ${({ theme }) => hexToRGBA(theme.highlight, 0.25)} 63%
  );
  background-size: 50rem 100%;
  animation: ${shimmer} 2.2s infinite linear;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SkeletonForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkeletonField = styled(SkeletonBase)`
  width: 100%;
  height: 3.3rem;
`;
const SkeletonLabel = styled(SkeletonBase)`
  width: 5rem;
  height: 0.875rem;
`;

export const ProfileSkeleton = () => {
  return (
    <>
      <SkeletonForm aria-hidden="true">
        <SkeletonLabel />
        <SkeletonField />
        <SkeletonLabel />
        <SkeletonField />
        <SkeletonLabel />
        <SkeletonField />
        <SkeletonLabel />
        <SkeletonField />
      </SkeletonForm>
    </>
  );
};
