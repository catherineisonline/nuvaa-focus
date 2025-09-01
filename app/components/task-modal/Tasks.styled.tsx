import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--shadow-light);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const Modal = styled.div<{ $bgImage?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 90%;
  max-width: 45rem;
  max-height: 90vh;
  min-height: 70vh;
  border-radius: 30px;
  border-radius: 1rem;
  padding: 1.5rem;
  overflow: hidden;
  background: ${({ theme }) => theme.backgroundGradient};
  box-shadow: ${({ $bgImage, theme }) => ($bgImage ? undefined : theme.boxShadowOuter)};
  @media ${media.md} {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--shadow-light);

  h2 {
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.text};
    font-size: 2rem;
    font-weight: 500;
  }
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 60vh;
  max-height: 80vh;
  gap: 2rem;
  @media ${media.md} {
    max-height: 85vh;
    gap: 1rem;
  }
`;
export const AddTaskSection = styled.section`
  border-bottom: 1px solid var(--shadow-light);
  display: grid;
  grid-template-columns: 1fr 3rem;
  gap: 10px;
`;

export const TaskInput = styled.input`
  flex: 1;
  padding: 15px 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  transition: var(--transition);
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.inputInner};
  box-shadow: ${({ theme }) => theme.boxShadowInputDisabled};
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.boxShadowInput};
  }
`;

export const AddTaskButton = styled.button`
  color: ${({ theme }) => theme.buttonText};
  border: none;
  width: 50px;
  height: auto;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.backgroundSecondary};
  box-shadow: ${({ theme }) => theme.boxShadowOuter};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      transform: var(--hover-transform);
    }
  }
  &:disabled {
    color: ${({ theme }) => theme.buttonTextDisabled};
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.highlight};
  }
`;

export const TasksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  padding-bottom: 10rem;
  @media ${media.md} {
    padding-bottom: 2rem;
  }
`;

export const CurrentTaskSection = styled.div`
  border-bottom: 1px solid var(--shadow-light);

  h3 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
  }
`;

export const CurrentTaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.buttonText};
  font-family: var(--font-outfit);
  padding: 19px;
  border-radius: 8px;
  font-weight: 500;
  min-height: 1rem;

  span {
    flex: 1;
    overflow: hidden;
    white-space: wrap;
    word-break: break-word;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.highlight};
  }
  @media ${media.sm} {
    align-items: flex-start;
  }
`;

export const RemoveCurrentBtn = styled.button`
  flex-shrink: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);
  svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
    }
  }
`;

export const TaskListSection = styled.section`
  max-height: 95vh;
  padding: 5px;
  h3 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
  }
`;

export const TaskList = styled.ul`
  padding-left: 0;
`;

export const TaskItem = styled.li<{ $edit?: boolean; $completed?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $edit, $completed }) =>
    $edit ? "1rem 1fr" : $completed ? "1rem 1fr 2rem" : "1rem 2rem 1fr"};
  align-items: center;
  gap: 10px;
  opacity: ${({ $completed }) => ($completed ? 0.7 : 1)};

  &:focus-visible {
    outline: none;
  }
`;

export const DragPreview = styled.div`
  background-color: var(--color-glass);
  display: grid;
  grid-template-columns: 1rem 2rem 1fr;
  align-items: center;
  gap: 10px;
  opacity: 0.5;
  transform: translate(-210px, -5rem);
`;

export const TaskDragHandle = styled.div`
  color: ${({ theme }) => theme.text};
  cursor: grab;
  display: flex;
  align-items: center;

  &:active {
    cursor: grabbing;
  }
`;

export const TaskCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.highlight};
  }
`;

export const TaskText = styled.span<{
  $completed?: boolean;
  $current?: boolean;
}>`
  font-size: 1rem;
  color: ${({ theme, $current }) => ($current ? theme.buttonText : theme.text)};
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-outfit);
  display: flex;
  flex-direction: row;
  font-weight: 400;
  overflow: hidden;
  white-space: wrap;
  word-break: break-word;
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
  opacity: ${({ $completed }) => ($completed ? 0.6 : 1)};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.highlight};
    }
  }
`;

export const CurrentIndicator = styled.span`
  opacity: 0.8;
  font-weight: 500;
  flex-shrink: 0;
  margin-left: 10px;
`;

export const TaskEdit = styled.div`
  display: grid;
  grid-template-columns: 1fr 4.5rem;
  gap: 10px;
`;

export const TaskNonEdit = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 10px;
`;

export const TaskEditInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.highlight};
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.inputInner};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
  }
`;

export const SaveEditBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
  color: ${({ theme }) => theme.text};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
    }
  }
`;

export const CancelEditBtn = styled(SaveEditBtn)`
  color: ${({ theme }) => theme.highlight};
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: var(--transition);

  @media (hover: hover) and (pointer: fine) {
    ${TaskItem}:hover & {
      opacity: 1;
    }
    ${TaskItem}:focus-within &,
    ${TaskItem} &:focus-visible {
      opacity: 1;
    }
  }

  @media ${media.md} {
    ${TaskItem} & {
      opacity: 1;
    }
  }
`;

export const TaskActionBtn = styled.button<{ $type?: "edit" | "delete" }>`
  background-color: transparent;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $type, theme }) =>
    $type === "edit" ? theme.buttonText : $type === "delete" ? theme.highlight : "inherit"};

  &:focus-visible {
    svg {
      transform: scale(1.4);
    }
    outline: none;
  }
`;

export const CompletedSection = styled.section`
  opacity: 0.8;

  h3 {
    font-size: 1.2rem;
    opacity: 0.7;
  }
`;

export const EmptyState = styled.div`
  p {
    font-style: italic;
  }
`;

export const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: var(--transition);
  color: ${({ theme }) => theme.text};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.highlight};
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-glass);
    }
  }
`;
