import { createSelector } from "@reduxjs/toolkit";

const selectEditingId = (state) => state.tasks.editingId;
const selectEditText = (state) => state.tasks.editText;
const selectNewTaskText = (state) => state.tasks.newTaskText;
const selectTasks = (state) => state.tasks.tasks;
const selectCurrentTaskId = (state) => state.tasks.currentTaskId;
const selectActiveDrag = (state) => state.tasks.activeDrag;
export const tasksSelectors = createSelector(
  [
    selectEditingId,
    selectNewTaskText,
    selectTasks,
    selectCurrentTaskId,
    selectActiveDrag,
    selectEditText,
  ],
  (editingId, newTaskText, tasks, currentTaskId, activeDrag, editText) => ({
    editingId,
    newTaskText,
    tasks,
    currentTaskId,
    activeDrag,
    editText,
  })
);
