"use client";
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
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableTask from "./SortableTask";
import SortableTaskDrag from "./SortableDrag";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "../../redux/slices/navigationSlice";
import {
  deleteTask,
  moveTask,
  resetTaskfield,
  setActiveDrag,
  setCurrentTaskId,
  setEditingId,
  setEditText,
  setTasks,
  toggleTaskAsComplete,
  updateTaskfield,
} from "../../redux/slices/tasksSlice";
import { tasksSelectors } from "../../redux/selectors/tasksSelectors";
import { RootState } from "../../redux/store";

const TaskModal = () => {
  const dispatch = useDispatch();
  const { editingId, newTaskText, tasks, activeDrag } =
    useSelector(tasksSelectors);
  const currentTask = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === state.tasks.currentTaskId)
  );

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleModal({ target: "isTasksActive" }));
    }
  };
  const handleModalClose = () => {
    dispatch(closeModal({ target: "isTasksActive" }));
  };
  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      dispatch(setTasks({ task: newTask }));
      dispatch(resetTaskfield());
    }
  };

  const toggleTask = (id: string) => {
    dispatch(toggleTaskAsComplete({ id: id }));
    removeCurrentTask();
  };

  const cancelEdit = () => {
    dispatch(setEditingId({ id: null }));
    dispatch(setEditText({ text: "" }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask({ id: id }));
    if (currentTask && currentTask.id === id) {
      dispatch(setCurrentTaskId({ id: null }));
    }
  };
  const removeCurrentTask = () => {
    dispatch(setCurrentTaskId({ id: null }));
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

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    dispatch(setActiveDrag({ drag: null }));
    if (active.id !== over.id) {
      dispatch(moveTask({ activeId: active.id, overId: over.id }));
    }
  };
  const handleDrag = (e: DragStartEvent) => {
    dispatch(setActiveDrag({ drag: e.active.id }));
  };
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateTaskfield({ text: input }));
  };
  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div
        role="dialog"
        aria-labelledby="tasks-title"
        className="modal neu-modal">
        <header className="modal-header">
          <h2 id="tasks-title">Tasks</h2>
          <button
            className="close-btn"
            aria-label="Close"
            onClick={handleModalClose}>
            <X size={32} />
          </button>
        </header>

        <div className="modal-body-tasks single-column">
          <section className="add-task-section">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => handleTaskChange(e)}
              onFocus={cancelEdit}
              placeholder="Add a new task..."
              autoFocus={true}
              className="task-input neu-input-inner "
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
                  {!editingId && (
                    <button
                      aria-label="Remove current task"
                      onClick={removeCurrentTask}
                      className="remove-current-btn">
                      <CircleMinus size={20} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTasks.length > 0 && (
              <div className="task-list-section">
                <h3>Active Tasks ({activeTasks.length})</h3>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragStart={(e) => handleDrag(e)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  sensors={sensors}>
                  <SortableContext
                    items={activeTasks.map((task) => task.id.toString())}
                    strategy={verticalListSortingStrategy}>
                    {activeDrag && (
                      <DragOverlay>
                        <SortableTaskDrag
                          key={activeDrag.id}
                          task={activeDrag.id}
                          currentTask={currentTask}
                        />
                      </DragOverlay>
                    )}
                    {activeTasks.map((task) => (
                      <SortableTask
                        key={task.id}
                        editingId={editingId}
                        task={task}
                        toggleTask={toggleTask}
                        cancelEdit={cancelEdit}
                        currentTask={currentTask}
                        deleteTask={handleDelete}
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
                        onClick={() => handleDelete(task.id)}
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
