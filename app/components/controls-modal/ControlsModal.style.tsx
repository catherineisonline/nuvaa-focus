import styled from "styled-components";

export const HamburgerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const HamburgerControls = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 2rem;
`;
export const Title = styled.h2`
  display: flex;
  flex-direction: column;
  line-height: 2.3rem;
  font-size: 3rem;
  font-family: var(--font-lexend);
  font-weight: 800;
  color: ${({ theme }) => theme.text};

  span {
    font-size: 3.3rem;

    span {
      font-size: 3.3rem;
      color: ${({ theme }) => theme.highlight};
    }
  }
`;
export const IconButton = styled.button`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  border: none;
  padding: 1rem;
  font-size: 2rem;
  font-family: var(--font-lexend);
  border-radius: var(--border-radius);
  cursor: pointer;
  backdrop-filter: blur(10px);
  width: 100%;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadowOuter};
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }

  &:focus {
    background-color: ${({ theme }) => theme.buttonBackgroundActive};
    box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
  }
`;
