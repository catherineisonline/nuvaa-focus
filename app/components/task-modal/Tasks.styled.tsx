import styled from "styled-components";

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

export const Modal = styled.div`
  width: 90%;
  max-width: 35rem;
  max-height: 65vh;
  min-height: 60vh;
  border-radius: 30px;
  border-radius: 1rem;
  padding: 1rem;
  overflow: hidden;
  background: linear-gradient(145deg, #f8f8f8, #ededed);
  box-shadow: 12px 12px 27px #adacac, -12px -12px 27px #dedede;
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
    color: var(--color-text);
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
  padding: 19px 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-text);
  transition: var(--transition);
  border-radius: 30px;
  box-shadow: inset 5px 5px 10px #e1e0e0, inset -5px -5px 10px #f9f8f8;
  &:focus {
    outline: none;
    box-shadow: inset 5px 5px 10px #c7c7c7, inset -5px -5px 10px #e8e8e8;
  }
`;

export const AddTaskButton = styled.button`
  color: var(--color-button-text);
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  background-color: #f3f2f2;
  box-shadow: 3px 3px 10px #bebebe, -5px -5px 10px #f9f8f8;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active {
    background: #e9e6e6;
    box-shadow: inset 6px 6px 13px #dad8d8, inset -6px -6px 13px #faf8f8;
  }

  &:disabled {
    color: var(--color-button-text-disabled);
    cursor: not-allowed;
    background: #e7e6e6;
    box-shadow: 1px 1px 2px #989797, -1px -1px 2px #eeeded;
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
`;

export const CurrentTaskSection = styled.div`
  border-bottom: 1px solid var(--shadow-light);

  h3 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    color: var(--color-text);
    font-weight: 600;
  }
`;

export const CurrentTaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #edececaa;
  color: var(--color-button-text);
  font-family: var(--font-outfit);
  padding: 19px;
  border-radius: 8px;
  height: 1rem;
  font-weight: 500;
`;

export const RemoveCurrentBtn = styled.button`
  background-color: transparent;
  color: var(--color-button-text);
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
  }
`;

export const TaskListSection = styled.section`
  h3 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    color: var(--color-text);
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
  color: var(--color-text);
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
  color: ${({ $current }) =>
    $current ? "var(--color-button-text)" : "var(--color-text)"};
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

  &:hover {
    color: var(--color-highlight);
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
  border: 1px solid var(--color-highlight);
  border-radius: 4px;
  background-color: var(--color-modal);
  font-size: 0.8rem;
  color: var(--color-text);

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
  color: var(--color-text);

  &:hover {
    transform: translateY(-1px);
  }
`;

export const CancelEditBtn = styled(SaveEditBtn)`
  color: var(--color-highlight);
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: var(--transition);

  ${TaskItem}:hover & {
    opacity: 1;
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
  color: ${({ $type }) =>
    $type === "edit"
      ? "var(--color-button-text)"
      : $type === "delete"
      ? "var(--color-highlight)"
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
  color: var(--color-text);

  &:hover {
    background-color: var(--color-glass);
  }
`;
