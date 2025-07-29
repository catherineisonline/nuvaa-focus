"use client";
import "./Header.styled.tsx";
import { Flame } from "lucide-react";
import { Controls } from "./Controls";

import {
  HeaderMain,
  Nav,
  PomodoroCounter,
  StreakSpan,
  Title,
} from "./Header.styled";
import { HamburgerButton } from "./Hamburger";
import { RootState } from "../../redux/store.js";
import { useSelector } from "react-redux";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";

const Header = () => {
  const isBackgroundActive = useBackgroundStatus();
  const streak = useSelector((state: RootState) => state.app.streak);

  return (
    <HeaderMain>
      <Title $bgImage={isBackgroundActive} translate="no">
        Nuvaa
        <span>
          Foc<span>us</span>
        </span>
      </Title>
      <Nav>
        <PomodoroCounter>
          <Flame />
          <StreakSpan $bgImage={isBackgroundActive}>{streak}</StreakSpan>
        </PomodoroCounter>
        <Controls />
        <HamburgerButton />
      </Nav>
    </HeaderMain>
  );
};

export default Header;
