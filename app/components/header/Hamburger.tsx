"use client";

import { Menu, X } from "lucide-react";
import { HamburgerIcon } from "./Header.styled";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../../redux/slices/navigationSlice";
import { RootState } from "../../redux/store";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";

export const HamburgerButton = () => {
  const dispatch = useDispatch();

  const handleHamburger = () => {
    dispatch(toggleHamburger());
  };
  const isActive = useSelector(
    (state: RootState) => state.navigation.isHamburgerActive
  );
  const isBackgroundActive = useBackgroundStatus();
  return (
    <HamburgerIcon $bgImage={isBackgroundActive} onClick={handleHamburger}>
      {isActive ? <X /> : <Menu />}
    </HamburgerIcon>
  );
};
