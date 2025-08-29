"use client";

import CircleQuestionMark from "lucide-react/dist/esm/icons/circle-question-mark";
import ListTodo from "lucide-react/dist/esm/icons/list-todo";
import Maximize from "lucide-react/dist/esm/icons/maximize";
import Minimize from "lucide-react/dist/esm/icons/minimize";
import Music from "lucide-react/dist/esm/icons/music";
import Settings from "lucide-react/dist/esm/icons/settings";

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { RootState } from "../../redux/store";
import { HeaderControls, IconButton } from "./Header.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import { setHideModal } from "../../redux/slices/musicSlice";
import Link from "next/link";
export const Controls = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();

  const isFullscreen = useSelector((state: RootState) => state.navigation.isFullscreen);
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
    <HeaderControls>
      <li>
        <IconButton $bgImage={isBackgroundActive} onClick={handleTasks} aria-label="Todo list">
          <ListTodo />
        </IconButton>
      </li>
      <li>
        <IconButton $bgImage={isBackgroundActive} onClick={handleMusic} aria-label="Music">
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
        <IconButton $bgImage={isBackgroundActive} onClick={handleSettings} aria-label="Settings">
          <Settings />
        </IconButton>
      </li>
      <li>
        <Link href="/about">
          <IconButton $bgImage={isBackgroundActive} aria-label="How it works">
            <CircleQuestionMark />
          </IconButton>
        </Link>
      </li>
    </HeaderControls>
  );
};
