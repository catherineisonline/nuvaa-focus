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
  width: 90%;
  max-width: 45rem;
  max-height: 75vh;
  min-height: 70vh;
  border-radius: 30px;
  border-radius: 1rem;
  padding: 1rem;
  overflow: hidden;
  background: ${({ theme }) => theme.backgroundGradient};
  box-shadow: ${({ $bgImage, theme }) =>
    $bgImage ? undefined : theme.boxShadowOuter};
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
  padding: 1rem;
  border-bottom: 1px solid var(--shadow-light);

  h2 {
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.text};
    font-size: 2rem;
    font-weight: 600;
  }
`;
export const ModalBody = styled.div`
  flex-direction: column;
  max-height: 80vh;
`;
export const AddTaskSection = styled.section`
  padding: 20px 24px;
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
`;

export const TasksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 10px 24px;
  max-height: calc(50vh - 100px);
  overflow-y: scroll;
  padding-bottom: 2rem;
  @media ${media.md} {
    max-height: 95vh;
  }
`;

export const CurrentTaskSection = styled.div`
  border-bottom: 1px solid var(--shadow-light);

  h3 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text};
    font-weight: 600;
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
  height: 1rem;
  font-weight: 500;
`;

export const RemoveCurrentBtn = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
    }
  }
`;

export const TaskListSection = styled.section`
  max-height: 95vh;
  h3 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text};
    font-weight: 600;
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
  gap: 10px;
  font-weight: 400;
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  opacity: ${({ $completed }) => ($completed ? 0.6 : 1)};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.highlight};
    }
  }
`;

export const CurrentIndicator = styled.span`
  opacity: 0.8;
  font-weight: 600;
`;

export const TaskEdit = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 2rem;
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
    $type === "edit"
      ? theme.buttonText
      : $type === "delete"
      ? theme.highlight
      : "inherit"};
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

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-glass);
    }
  }
`;
