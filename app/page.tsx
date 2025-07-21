import "./page.css";
import React from "react";
import Header from "./components/header/Header";
import { ModeTab } from "./components/home/ModeTab";
import { ModeTime } from "./components/home/ModeTime";
import { Initilizer } from "./components/home/Initilizer";
import { Modals } from "./components/home/Modals";

export default function Page() {
  return (
    <div>
      <Initilizer />
      <div className="background-overlay"></div>
      <Header />
      <main className="main-content">
        <ModeTab />
        <ModeTime />
      </main>
      <Modals />
    </div>
  );
}
