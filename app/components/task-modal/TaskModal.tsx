"use client";

import Plus from "lucide-react/dist/esm/icons/plus";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import CircleMinus from "lucide-react/dist/esm/icons/circle-minus";
import X from "lucide-react/dist/esm/icons/x";

import "./Tasks.styled.tsx";
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

import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
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
import {
  AddTaskButton,
  AddTaskSection,
  CloseBtn,
  CompletedSection,
  CurrentTaskItem,
  CurrentTaskSection,
  Modal,
  ModalBody,
  ModalHeader,
  Overlay,
  RemoveCurrentBtn,
  TaskActionBtn,
  TaskCheckbox,
  TaskInput,
  TaskItem,
  TaskList,
  TaskListSection,
  TasksSection,
  TaskText,
} from "./Tasks.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";

const TaskModal = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const { editingId, newTaskText, tasks, activeDrag } = useSelector(tasksSelectors);
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
    <Overlay onClick={handleOutsideClick}>
      <Modal $bgImage={isBackgroundActive} role="dialog" aria-labelledby="tasks-title">
        <ModalHeader>
          <h2 id="tasks-title">Tasks</h2>
          <CloseBtn aria-label="Close" onClick={handleModalClose}>
            <X size={32} />
          </CloseBtn>
        </ModalHeader>

        <ModalBody>
          <AddTaskSection>
            <TaskInput
              type="text"
              value={newTaskText}
              onChange={(e) => handleTaskChange(e)}
              onFocus={cancelEdit}
              maxLength={40}
              placeholder="Add a new task..."
              autoFocus={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTask();
                }
              }}
            />
            <AddTaskButton onClick={addTask} disabled={!newTaskText.trim()}>
              <Plus size={20} />
            </AddTaskButton>
          </AddTaskSection>

          <TasksSection>
            {currentTask && (
              <CurrentTaskSection>
                <h3>Current Task</h3>
                <CurrentTaskItem>
                  <span>{currentTask.text}</span>
                  {!editingId && (
                    <RemoveCurrentBtn aria-label="Remove current task" onClick={removeCurrentTask}>
                      <CircleMinus size={20} />
                    </RemoveCurrentBtn>
                  )}
                </CurrentTaskItem>
              </CurrentTaskSection>
            )}

            {activeTasks.length > 0 && (
              <TaskListSection>
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
                        <SortableTaskDrag key={activeDrag.id} task={activeDrag.id} currentTask={currentTask} />
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
              </TaskListSection>
            )}

            {completedTasks.length > 0 && (
              <CompletedSection>
                <h3>Completed ({completedTasks.length})</h3>
                <TaskList>
                  {completedTasks.map((task) => (
                    <TaskItem $completed={true} key={task.id}>
                      <TaskCheckbox type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                      <TaskText $completed={true}>{task.text}</TaskText>
                      <TaskActionBtn $type="delete" onClick={() => handleDelete(task.id)} aria-label="Delete task">
                        <Trash2 size={24} />
                      </TaskActionBtn>
                    </TaskItem>
                  ))}
                </TaskList>
              </CompletedSection>
            )}
            {tasks.length === 0 && <p>No tasks yet. Add your first task 💪🏻</p>}
          </TasksSection>
        </ModalBody>
      </Modal>
    </Overlay>
  );
};

export default TaskModal;
