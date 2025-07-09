import { createSelector } from "@reduxjs/toolkit";

const selectEditingId = (state) => state.tasks.editingId;
const selectNewTaskText = (state) => state.tasks.newTaskText;
const selectTasks = (state) => state.tasks.tasks;
const selectCurrentTaskId = (state) => state.tasks.currentTaskId;

export const tasksSelectors = createSelector(
  [selectEditingId, selectNewTaskText, selectTasks, selectCurrentTaskId],
  (editingId, newTaskText, tasks, currentTaskId) => ({
    editingId,
    newTaskText,
    tasks,
    currentTaskId,
  })
);
