import "./Header.styled.tsx";
import { Flame } from "lucide-react";
import { Controls } from "./Controls";
import { Streak } from "./Streak";
import { HeaderMain, Nav, PomodoroCounter, Title } from "./Header.styled";
import { HamburgerButton } from "./Hamburger";

const Header = () => {
  return (
    <HeaderMain>
      <Title translate="no">
        Nuvaa
        <span>
          Foc<span>us</span>
        </span>
      </Title>
      <Nav>
        <PomodoroCounter>
          <Flame />
          <Streak />
        </PomodoroCounter>
        <Controls />
        <HamburgerButton />
      </Nav>
    </HeaderMain>
  );
};

export default Header;
