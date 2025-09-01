"use client";

import CircleQuestionMark from "lucide-react/dist/esm/icons/circle-question-mark";
import ListTodo from "lucide-react/dist/esm/icons/list-todo";

import Music from "lucide-react/dist/esm/icons/music";
import Settings from "lucide-react/dist/esm/icons/settings";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { HamburgerButton } from "../header/Hamburger";
import { HamburgerControls, IconButton, HamburgerModal, Title } from "./ControlsModal.style";
import { setHideModal } from "../../redux/slices/musicSlice";

export const ControlsModal = () => {
  const dispatch = useDispatch();
  const hideModal = useSelector((state: RootState) => state.music.hideModal);

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
  const handleRedirection = () => {
    dispatch(setHideModal({ value: false }));
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
          <IconButton onClick={handleSettings} aria-label="Settings">
            <Settings /> Settings
          </IconButton>
        </li>
        <li>
          <IconButton as="a" aria-label="How it works" href="/about" onClick={handleRedirection}>
            <CircleQuestionMark /> How it works
          </IconButton>
        </li>
      </HamburgerControls>
    </HamburgerModal>
  );
};
