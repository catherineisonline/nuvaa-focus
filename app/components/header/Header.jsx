import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Settings,
  Minimize,
  Music,
  Maximize,
  ListTodo,
  Flame,
} from "lucide-react";
import { toggleModal } from "@/app/redux/slices/navigationSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isFullscreen = useSelector((state) => state.navigation.isFullscreen);
  const streak = useSelector((state) => state.app.streak);
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
    <header className="header">
      <h1 translate="no">
        Nuvaa
        <span>
          Foc<span>us</span>
        </span>
      </h1>

      <nav>
        <p className="pomodoro-counter">
          <Flame />
          <span>{streak}</span>
        </p>
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
      </nav>
    </header>
  );
};

export default Header;
