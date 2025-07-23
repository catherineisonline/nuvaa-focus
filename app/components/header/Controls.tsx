"use client";

import { Settings, Minimize, Music, Maximize, ListTodo } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { RootState } from "../../redux/store";
import { HeaderControls, IconButton } from "./Header.styled";
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
    <HeaderControls>
      <li>
        <IconButton onClick={handleTasks} aria-label="Todo list">
          <ListTodo />
        </IconButton>
      </li>
      <li>
        <IconButton onClick={handleMusic} aria-label="Music">
          <Music />
        </IconButton>
      </li>
      <li>
        <IconButton
          onClick={handleFullscreen}
          aria-label={isFullscreen ? "Maximize screen" : "Minimize screen"}>
          {isFullscreen ? <Maximize /> : <Minimize />}
        </IconButton>
      </li>
      <li>
        <IconButton onClick={handleSettings} aria-label="Settings">
          <Settings />
        </IconButton>
      </li>
    </HeaderControls>
  );
};
