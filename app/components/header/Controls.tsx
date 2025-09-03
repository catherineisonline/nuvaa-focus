"use client";

import CircleQuestionMark from "lucide-react/dist/esm/icons/circle-question-mark";
import ListTodo from "lucide-react/dist/esm/icons/list-todo";
import Maximize from "lucide-react/dist/esm/icons/maximize";
import Minimize from "lucide-react/dist/esm/icons/minimize";
import Settings from "lucide-react/dist/esm/icons/settings";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/slices/navigationSlice";
import { RootState } from "../../redux/store";
import { HeaderControls, IconButton } from "./Header.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import Link from "next/link";
import { setIsMusicPlaying } from "../../redux/slices/settingsSlice";

export const Controls = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const isFullscreen = useSelector((state: RootState) => state.navigation.isFullscreen);
  const isMusicPlaying = useSelector((state: RootState) => state.settings.isMusicPlaying);
  const handleFullscreen = () => {
    dispatch(toggleModal({ target: "isFullscreen" }));
  };
  const handleTasks = () => {
    dispatch(toggleModal({ target: "isTasksActive" }));
  };

  const handleSettings = () => {
    if (!isMusicPlaying) {
      dispatch(toggleModal({ target: "isSettingsActive" }));
    } else {
      dispatch(setIsMusicPlaying({ value: false }));
    }
  };

  return (
    <HeaderControls>
      <li>
        <IconButton $bgImage={isBackgroundActive} onClick={handleTasks} aria-label="Todo list">
          <ListTodo />
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
