import React from "react";
import { GripVertical } from "lucide-react";

const SortableTaskDrag = ({ task, currentTask }) => {
  return (
    <div className="drag-preview" aria-hidden="true">
      <div className="task-drag-handle">
        <GripVertical size={24} />
      </div>
      <input type="checkbox" className="task-checkbox" />
      <div className="task-nonedit">
        <p className={`task-text`}>
          {task.text}
          {currentTask && currentTask.id === task.id && (
            <span className="current-indicator">&#40;Current&#41;</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SortableTaskDrag;
