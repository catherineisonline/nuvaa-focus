import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import GripVertical from "lucide-react/dist/esm/icons/grip-vertical";
import Check from "lucide-react/dist/esm/icons/check";
import Ban from "lucide-react/dist/esm/icons/ban";
import Pencil from "lucide-react/dist/esm/icons/pencil";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTaskId, setEditingId, setEditText, toggleEdit, updatedEdit } from "../../redux/slices/tasksSlice";
import { tasksSelectors } from "../../redux/selectors/tasksSelectors";
import {
  CancelEditBtn,
  CurrentIndicator,
  SaveEditBtn,
  TaskActionBtn,
  TaskActions,
  TaskCheckbox,
  TaskDragHandle,
  TaskEdit,
  TaskEditInput,
  TaskItem,
  TaskNonEdit,
  TaskText,
} from "./Tasks.styled";

type Task = {
  text: string;
  id: string;
  completed: boolean;
};
const SortableTask = ({ editingId, task, toggleTask, currentTask, deleteTask, cancelEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task,
    transition: {
      duration: 500,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const dispatch = useDispatch();

  const handleTaskEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(setEditText({ text: input }));
  };

  const { editText } = useSelector(tasksSelectors);
  const setAsCurrentTask = (task: Task) => {
    if (task && task.completed) return;
    dispatch(setCurrentTaskId({ id: task.id }));
  };
  const saveEdit = () => {
    if (editText) {
      dispatch(updatedEdit());
    }
    dispatch(setEditingId({ id: null }));
    dispatch(setEditText({ text: "" }));
  };
  const startEditing = (task: Task) => {
    dispatch(toggleEdit({ id: task.id, text: task.text }));
  };
  return (
    <TaskItem as="div" $edit={editingId} ref={setNodeRef} style={style} {...attributes}>
      <TaskDragHandle {...listeners}>
        <GripVertical size={24} />
      </TaskDragHandle>

      {!editingId && <TaskCheckbox type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />}

      {editingId === task.id ? (
        <TaskEdit>
          <TaskEditInput
            type="text"
            value={editText}
            autoFocus={true}
            onChange={(e) => handleTaskEdit(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                saveEdit();
              }
            }}
          />
          <TaskActions>
            <SaveEditBtn aria-label="Save" onClick={saveEdit}>
              <Check size={20} />
            </SaveEditBtn>
            <CancelEditBtn aria-label="Cancel" onClick={cancelEdit}>
              <Ban size={20} />
            </CancelEditBtn>
          </TaskActions>
        </TaskEdit>
      ) : (
        <TaskNonEdit>
          <TaskText
            $completed={task.completed}
            $current={currentTask && currentTask.id === task.id}
            onClick={() => setAsCurrentTask(task)}>
            {task.text}
            {currentTask && currentTask.id === task.id && <CurrentIndicator>&#40;Current&#41;</CurrentIndicator>}
          </TaskText>

          <TaskActions>
            <TaskActionBtn $type="edit" onClick={() => startEditing(task)} aria-label="Edit task">
              <Pencil size={20} />
            </TaskActionBtn>
            <TaskActionBtn $type="delete" onClick={() => deleteTask(task.id)} aria-label="Delete task">
              <Trash2 size={20} />
            </TaskActionBtn>
          </TaskActions>
        </TaskNonEdit>
      )}
    </TaskItem>
  );
};

export default SortableTask;
