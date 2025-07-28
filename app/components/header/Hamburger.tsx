"use client";

import { Menu, X } from "lucide-react";
import { HamburgerIcon } from "./Header.styled";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../../redux/slices/navigationSlice";
import { RootState } from "../../redux/store";

export const HamburgerButton = () => {
  const dispatch = useDispatch();

  const handleHamburger = () => {
    dispatch(toggleHamburger());
  };
  const isActive = useSelector(
    (state: RootState) => state.navigation.isHamburgerActive
  );
  return (
    <HamburgerIcon onClick={handleHamburger}>
      {isActive ? <X /> : <Menu />}
    </HamburgerIcon>
  );
};
