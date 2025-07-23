import React from "react";
import Header from "./components/header/Header";
import { ModeTab } from "./components/home/ModeTab";
import { ModeTime } from "./components/home/ModeTime";
import { Initilizer } from "./components/home/Initilizer";
import { Modals } from "./components/home/Modals";
import { MainWrapper, Overlay } from ".//Page.styled";

export default function Page() {
  return (
    <div>
      <Initilizer />
      <Overlay />
      <Header />
      <MainWrapper>
        <ModeTab />
        <ModeTime />
      </MainWrapper>
      <Modals />
    </div>
  );
}
