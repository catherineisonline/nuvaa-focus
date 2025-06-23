import "./header.css";
import {
  Settings,
  Minimize,
  Music,
  Maximize,
  ListTodo,
  Flame,
} from "lucide-react";

const Header = ({
  toggleFullscreen,
  setShowSettings,
  setShowTasks,
  setShowMusic,
  streak,
}) => {
  return (
    <header className="header">
      <h1>Nuvaa Focus</h1>

      <nav>
        <p className="pomodoro-counter">
          <Flame />
          <span>{streak}</span>
        </p>
        <ul className="header-controls">
          <li>
            <button
              className="icon-button"
              onClick={() => setShowTasks(true)}
              aria-label="Todo list">
              <ListTodo />
            </button>
          </li>
          <li>
            <button
              className="icon-button"
              onClick={() => setShowMusic(true)}
              aria-label="Music">
              <Music />
            </button>
          </li>
          <li>
            <button
              className="icon-button"
              onClick={toggleFullscreen}
              aria-label={
                toggleFullscreen ? "Maximize screen" : "Minimize screen"
              }>
              {toggleFullscreen ? <Maximize /> : <Minimize />}
            </button>
          </li>
          <li>
            <button
              className="icon-button"
              onClick={() => setShowSettings(true)}
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
