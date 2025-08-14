"use client";
import { ListTodo, Maximize, Minimize, Music, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { HamburgerButton } from "../header/Hamburger";
import {
  HamburgerControls,
  IconButton,
  HamburgerModal,
  Title,
} from "./ControlsModal.style";
import { setHideModal } from "../../redux/slices/musicSlice";

export const ControlsModal = () => {
  const dispatch = useDispatch();
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
    <HamburgerModal>
      <HamburgerButton />
      <Title translate="no">
        Nuvaa
        <span>
          Foc<span>us</span>
        </span>
      </Title>
      <HamburgerControls>
        <li>
          <IconButton onClick={handleTasks} aria-label="Todo list">
            <ListTodo /> Todo List
          </IconButton>
        </li>
        <li>
          <IconButton onClick={handleMusic} aria-label="Music">
            <Music /> Music
          </IconButton>
        </li>
        <li>
          <IconButton
            onClick={handleFullscreen}
            aria-label={isFullscreen ? "Maximize screen" : "Minimize screen"}>
            {isFullscreen ? <Maximize /> : <Minimize />} Toggle Fullscreen
          </IconButton>
        </li>
        <li>
          <IconButton onClick={handleSettings} aria-label="Settings">
            <Settings /> Settings
          </IconButton>
        </li>
      </HamburgerControls>
    </HamburgerModal>
  );
};
