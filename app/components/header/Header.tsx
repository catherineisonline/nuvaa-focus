import "./header.css";
import { Flame } from "lucide-react";
import { Controls } from "./Controls";
import { Streak } from "./Streak";

const Header = () => {
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
          <Streak />
        </p>
        <Controls />
      </nav>
    </header>
  );
};

export default Header;
