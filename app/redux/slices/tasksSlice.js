import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    newTaskText: "",
    editingId: null,
    editText: "",
    tasks: [],
    currentTaskId: null,
    activeDrag: null,
  },
  reducers: {
    initTasks(state, action) {
      const tasks = action.payload;
      state.tasks = tasks;
    },
    setTasks(state, action) {
      const task = action.payload.task;
      state.tasks.push(task);
    },
    toggleTaskAsComplete(state, action) {
      const id = action.payload.id;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
    },
    setEditingId(state, action) {
      const id = action.payload.id;
      state.editingId = id;
    },
    setEditText(state, action) {
      const text = action.payload.text;
      state.editText = text;
    },
    toggleEdit(state, action) {
      const { id, text } = action.payload;
      state.editingId = id;
      state.editText = text;
    },
    resetTaskfield(state) {
      state.newTaskText = "";
    },
    updateTaskfield(state, action) {
      const text = action.payload.text;
      state.newTaskText = text;
    },
    updatedEdit(state) {
      const id = state.editingId;
      const input = state.editText;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, text: input } : task
      );
    },

    deleteTask(state, action) {
      const id = action.payload.id;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    setCurrentTaskId(state, action) {
      const id = action.payload.id;
      state.currentTaskId = id;
    },
    setActiveDrag(state, action) {
      const drag = action.payload.drag;
      state.activeDrag = drag;
    },
    moveTask(state, action) {
      const { activeId, overId } = action.payload;

      const oldIndex = state.tasks.findIndex((task) => task.id === activeId);
      const newIndex = state.tasks.findIndex((task) => task.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        state.tasks = arrayMove(state.tasks, oldIndex, newIndex);
      }
    },
  },
});
export default tasksSlice.reducer;
export const {
  setTasks,
  toggleTaskAsComplete,
  toggleEdit,
  resetTaskfield,
  updateTaskfield,
  setEditText,
  initTasks,
  updatedEdit,
  deleteTask,
  setEditingId,
  setCurrentTaskId,
  moveTask,
  setActiveDrag,
} = tasksSlice.actions;
