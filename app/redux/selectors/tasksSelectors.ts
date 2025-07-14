import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectEditingId = (state: RootState) => state.tasks.editingId;
const selectEditText = (state: RootState) => state.tasks.editText;
const selectNewTaskText = (state: RootState) => state.tasks.newTaskText;
const selectTasks = (state: RootState) => state.tasks.tasks;
const selectCurrentTaskId = (state: RootState) => state.tasks.currentTaskId;
const selectActiveDrag = (state: RootState) => state.tasks.activeDrag;

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
