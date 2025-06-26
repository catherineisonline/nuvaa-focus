import { useState } from "react";
import {
  SquareX,
  Plus,
  Trash2,
  GripVertical,
  Pencil,
  CircleMinus,
  Ban,
  Check,
} from "lucide-react";
import "./tasks.css";
const TaskModal = ({
  setShowTasks,
  tasks,
  setTasks,
  currentTask,
  setCurrentTask,
}) => {
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowTasks(false);
    }
  };
  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
      setNewTaskText("");
    }
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    removeCurrentTask(id);
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId ? { ...task, text: editText.trim() } : task
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (currentTask && currentTask.id === id) {
      setCurrentTask(null);
    }
  };

  const setAsCurrentTask = (task) => {
    if (task.completed) return;
    setCurrentTask(task);
  };
  const removeCurrentTask = (id) => {
    if (currentTask.id === id) {
      setCurrentTask(null);
    }
  };
  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div
        role="dialog"
        aria-labelledby="tasks-title"
        className="task-modal single-column">
        <header className="modal-header">
          <h2 id="tasks-title">Tasks</h2>
          <button
            className="close-btn"
            aria-label="Close"
            onClick={() => setShowTasks(false)}>
            <SquareX size={24} />
          </button>
        </header>

        <div className="modal-body single-column">
          <section className="add-task-section">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onFocus={cancelEdit}
              placeholder="Add a new task..."
              className="task-input"
              onClick={addTask}
            />
            <button
              onClick={addTask}
              className="add-task-btn"
              disabled={!newTaskText.trim()}>
              <Plus size={20} />
            </button>
          </section>

          <section className="tasks-section">
            {currentTask && (
              <div className="current-task-section">
                <h3>Current Task</h3>
                <div className="current-task-item">
                  <span>{currentTask.text}</span>
                  <button
                    aria-label="Remove current task"
                    onClick={() => setCurrentTask(null)}
                    className="remove-current-btn">
                    <CircleMinus size={20} />
                  </button>
                </div>
              </div>
            )}

            {activeTasks.length > 0 && (
              <div className="task-list-section">
                <h3>Active Tasks ({activeTasks.length})</h3>
                <div className="task-list">
                  {activeTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`task-item ${editingId ? "edit" : ""}`}>
                      <div className="task-drag-handle">
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
                            className={`task-text ${
                              task.completed ? "completed" : ""
                            } ${
                              currentTask && currentTask.id === task.id
                                ? "current"
                                : ""
                            }`}
                            onClick={() => setAsCurrentTask(task)}>
                            {task.text}
                            {currentTask && currentTask.id === task.id && (
                              <span className="current-indicator">
                                (Current)
                              </span>
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
                  ))}
                </div>
              </div>
            )}

            {completedTasks.length > 0 && (
              <section className="task-list-section completed-section">
                <h3>Completed ({completedTasks.length})</h3>
                <ul className="task-list">
                  {completedTasks.map((task) => (
                    <li key={task.id} className="task-item completed">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="task-checkbox"
                      />
                      <span className="task-text completed">{task.text}</span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="task-action-btn delete"
                        aria-label="Delete task">
                        <Trash2 size={24} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tasks.length === 0 && <p>No tasks yet. Add your first task 💪🏻</p>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
