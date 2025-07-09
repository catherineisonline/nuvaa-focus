const { createSlice } = require("@reduxjs/toolkit");

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    newTaskText: "",
    editingId: null,
    editText: "",
    tasks: [],
    currentTaskId: null,
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
      state.tasks = state.tasks.map((task) =>
        task.id === state.editingId
          ? { ...task, text: state.editText.trim() }
          : task
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
} = tasksSlice.actions;
