"use client";

import CircleQuestionMark from "lucide-react/dist/esm/icons/circle-question-mark";
import ListTodo from "lucide-react/dist/esm/icons/list-todo";
import Settings from "lucide-react/dist/esm/icons/settings";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { HamburgerButton } from "../header/Hamburger";
import { HamburgerControls, IconButton, HamburgerModal, Title } from "./ControlsModal.style";
import { setIsMusicPlaying } from "../../redux/slices/settingsSlice";
import { RootState } from "../../redux/store";

export const ControlsModal = () => {
  const dispatch = useDispatch();
  const isMusicPlaying = useSelector((state: RootState) => state.settings.isMusicPlaying);
  const handleTasks = () => {
    dispatch(toggleModal("isTasksActive"));
  };

  const handleSettings = () => {
    if (!isMusicPlaying) {
      dispatch(toggleModal("isSettingsActive"));
    } else {
      dispatch(setIsMusicPlaying(false));
    }
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
          <IconButton onClick={handleSettings} aria-label="Settings">
            <Settings /> Settings
          </IconButton>
        </li>
        <li>
          <IconButton as="a" aria-label="How it works" href="/about">
            <CircleQuestionMark /> How it works
          </IconButton>
        </li>
      </HamburgerControls>
    </HamburgerModal>
  );
};
