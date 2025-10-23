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
      state.tasks = action.payload;
    },
    setTasks(state, action) {
      state.tasks.push(action.payload);
    },
    toggleTaskAsComplete(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    },
    setEditingId(state, action) {
      state.editingId = action.payload;
    },
    setEditText(state, action) {
      state.editText = action.payload;
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
      state.newTaskText = action.payload;
    },
    updatedEdit(state) {
      const id = state.editingId;
      const input = state.editText.trim();
      state.tasks = state.tasks.map((task) => (task.id === id ? { ...task, text: input } : task));
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setCurrentTaskId(state, action) {
      state.currentTaskId = action.payload;
    },
    setActiveDrag(state, action) {
      state.activeDrag = action.payload;
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
