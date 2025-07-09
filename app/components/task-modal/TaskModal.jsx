import { useState } from "react";
import { Plus, Trash2, CircleMinus, X } from "lucide-react";
import "./tasks.css";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableTask from "./SortableTask";
import SortableTaskDrag from "./SortableDrag";
import { useDispatch } from "react-redux";
import { closeModal, toggleModal } from "@/app/redux/slices/navigationSlice";

const TaskModal = ({ tasks, setTasks, currentTask, setCurrentTask }) => {
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const dispatch = useDispatch();
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleModal({ target: "isTasksActive" }));
    }
  };
  function handleModalClose() {
    dispatch(closeModal({ target: "isTasksActive" }));
  }
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  // drag
  const [activeDrag, setActiveDrag] = useState(null);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setActiveDrag(null);
    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  function handleDrag(e) {
    setActiveDrag(e.active);
  }
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
            onClick={handleModalClose}>
            <X size={32} />
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTask();
                }
              }}
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
                <DndContext
                  collisionDetection={closestCenter}
                  onDragStart={(e) => handleDrag(e)}
                  onDragEnd={handleDragEnd}
                  sensors={sensors}>
                  <SortableContext
                    items={activeTasks.map((task) => task.id.toString())}
                    strategy={verticalListSortingStrategy}>
                    <DragOverlay>
                      {activeDrag && activeDrag.id ? (
                        <SortableTaskDrag
                          key={activeDrag.id}
                          task={activeDrag.id}
                          currentTask={currentTask}
                        />
                      ) : null}
                    </DragOverlay>
                    {activeTasks.map((task) => (
                      <SortableTask
                        key={task.id}
                        editingId={editingId}
                        task={task}
                        toggleTask={toggleTask}
                        setEditText={setEditText}
                        cancelEdit={cancelEdit}
                        editText={editText}
                        setAsCurrentTask={setAsCurrentTask}
                        currentTask={currentTask}
                        startEditing={startEditing}
                        deleteTask={deleteTask}
                        saveEdit={saveEdit}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
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
