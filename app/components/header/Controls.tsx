"use client";

import { Settings, Minimize, Music, Maximize, ListTodo } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { RootState } from "../../redux/store";
export const Controls = () => {
  const dispatch = useDispatch();
  const isFullscreen = useSelector(
    (state: RootState) => state.navigation.isFullscreen
  );
  const handleFullscreen = () => {
    dispatch(toggleModal({ target: "isFullscreen" }));
  };
  const handleTasks = () => {
    dispatch(toggleModal({ target: "isTasksActive" }));
  };
  const handleMusic = () => {
    dispatch(toggleModal({ target: "isMusicActive" }));
  };
  const handleSettings = () => {
    dispatch(toggleModal({ target: "isSettingsActive" }));
  };
  return (
    <ul className="header-controls">
      <li>
        <button
          className="icon-button neu-button"
          onClick={handleTasks}
          aria-label="Todo list">
          <ListTodo />
        </button>
      </li>
      <li>
        <button
          className="icon-button neu-button"
          onClick={handleMusic}
          aria-label="Music">
          <Music />
        </button>
      </li>
      <li>
        <button
          className="icon-button neu-button"
          onClick={handleFullscreen}
          aria-label={isFullscreen ? "Maximize screen" : "Minimize screen"}>
          {isFullscreen ? <Maximize /> : <Minimize />}
        </button>
      </li>
      <li>
        <button
          className="icon-button neu-button"
          onClick={handleSettings}
          aria-label="Settings">
          <Settings />
        </button>
      </li>
    </ul>
  );
};
