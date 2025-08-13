"use client";
import { Settings, Minimize, Music, Maximize, ListTodo } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { RootState } from "../../redux/store";
import { HeaderControls, IconButton } from "./Header.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import { setHideModal } from "../../redux/slices/musicSlice";
export const Controls = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();

  const isFullscreen = useSelector(
    (state: RootState) => state.navigation.isFullscreen
  );
  const hideModal = useSelector((state: RootState) => state.music.hideModal);
  const handleFullscreen = () => {
    dispatch(toggleModal({ target: "isFullscreen" }));
  };
  const handleTasks = () => {
    dispatch(toggleModal({ target: "isTasksActive" }));
  };
  const handleMusic = () => {
    console.log("what", hideModal);
    if (hideModal) {
      dispatch(setHideModal({ value: false }));
    } else {
      dispatch(toggleModal({ target: "isMusicActive" }));
    }
  };
  const handleSettings = () => {
    dispatch(toggleModal({ target: "isSettingsActive" }));
  };

  return (
    <HeaderControls>
      <li>
        <IconButton
          $bgImage={isBackgroundActive}
          onClick={handleTasks}
          aria-label="Todo list">
          <ListTodo />
        </IconButton>
      </li>
      <li>
        <IconButton
          $bgImage={isBackgroundActive}
          onClick={handleMusic}
          aria-label="Music">
          <Music />
        </IconButton>
      </li>
      <li>
        <IconButton
          $bgImage={isBackgroundActive}
          onClick={handleFullscreen}
          aria-label={isFullscreen ? "Maximize screen" : "Minimize screen"}>
          {isFullscreen ? <Maximize /> : <Minimize />}
        </IconButton>
      </li>
      <li>
        <IconButton
          $bgImage={isBackgroundActive}
          onClick={handleSettings}
          aria-label="Settings">
          <Settings />
        </IconButton>
      </li>
    </HeaderControls>
  );
};
