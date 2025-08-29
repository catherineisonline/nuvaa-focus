import React from "react";

import GripVertical from "lucide-react/dist/esm/icons/grip-vertical";
import { CurrentIndicator, DragPreview, TaskCheckbox, TaskDragHandle, TaskNonEdit, TaskText } from "./Tasks.styled";

const SortableTaskDrag = ({ task, currentTask }) => {
  return (
    <DragPreview aria-hidden="true">
      <TaskDragHandle>
        <GripVertical size={24} />
      </TaskDragHandle>
      <TaskCheckbox type="checkbox" />
      <TaskNonEdit>
        <TaskText>
          {task.text}
          {currentTask && currentTask.id === task.id && <CurrentIndicator>&#40;Current&#41;</CurrentIndicator>}
        </TaskText>
      </TaskNonEdit>
    </DragPreview>
  );
};

export default SortableTaskDrag;
