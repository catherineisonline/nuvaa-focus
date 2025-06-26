import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ban, Check, GripVertical, Pencil, Trash2 } from "lucide-react";

const SortableTask = ({
  editingId,
  task,
  toggleTask,
  setEditText,
  setAsCurrentTask,
  currentTask,
  deleteTask,
  startEditing,
  saveEdit,
  editText,
  cancelEdit,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`task-item ${editingId ? "edit" : ""}`}>
      <div className="task-drag-handle" {...listeners}>
        <GripVertical size={24} />
      </div>

      {!editingId && (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="task-checkbox"
        />
      )}

      {editingId === task.id ? (
        <div className="task-edit">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="task-edit-input"
          />
          <button
            aria-label="Save"
            onClick={saveEdit}
            className="save-edit-btn">
            <Check size={20} />
          </button>
          <button
            aria-label="Cancel"
            onClick={cancelEdit}
            className="cancel-edit-btn">
            <Ban size={20} />
          </button>
        </div>
      ) : (
        <div className="task-nonedit">
          <p
            className={`task-text ${task.completed ? "completed" : ""} ${
              currentTask && currentTask.id === task.id ? "current" : ""
            }`}
            onClick={() => setAsCurrentTask(task)}>
            {task.text}
            {currentTask && currentTask.id === task.id && (
              <span className="current-indicator">&#40;Current&#41;</span>
            )}
          </p>

          <div className="task-actions">
            <button
              onClick={() => startEditing(task)}
              className="task-action-btn edit"
              aria-label="Edit task">
              <Pencil size={20} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="task-action-btn delete"
              aria-label="Delete task">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortableTask;
