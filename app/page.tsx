import React from "react";
import { ModeTab } from "./components/home/ModeTab";
import { ModeTime } from "./components/home/ModeTime";

import { MainWrapper } from ".//Page.styled";

export default function Page() {
  return (
    <div>
      <MainWrapper>
        <ModeTab />
        <ModeTime />
      </MainWrapper>
    </div>
  );
}
