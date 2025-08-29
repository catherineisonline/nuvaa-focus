"use client";

import SquareArrowLeft from "lucide-react/dist/esm/icons/square-arrow-left";
import "./Page.styled.tsx";
import {
  About,
  AboutSection,
  AboutSectionHeading,
  AboutSectionParagraph,
  AboutStep,
  AboutStepHeading,
  AboutStepParagraph,
  AboutSteps,
  GoBackButton,
} from "./Page.styled";
import { useBackgroundStatus } from "../hooks/useBackgroundStatus";

export default function Page() {
  const isBackgroundActive = useBackgroundStatus();

  return (
    <About>
      <GoBackButton href="/" aria-label="Go back to main page">
        <SquareArrowLeft /> go back
      </GoBackButton>
      <AboutSection>
        <AboutSectionHeading $bgImage={isBackgroundActive}>How to use Nuvaa Focus?</AboutSectionHeading>
        <AboutSectionParagraph $bgImage={isBackgroundActive}>
          Nuvaa Focus helps you manage your time and stay productive by breaking your work into manageable intervals,
          called focus sessions. Each session lasts around 25 minutes, separated by short breaks, helping your brain
          stay sharp while reducing burnout. Follow these steps to make the most out of it:
        </AboutSectionParagraph>
        <AboutSteps>
          <AboutStep>
            <AboutStepHeading>1. Choose a task</AboutStepHeading>
            <AboutStepParagraph>
              Start by selecting a meaningful task from your to-do list. It can be a work assignment, a personal
              project, or even a study session. Writing it down in Nuvaa Focus helps you commit to it and frees your
              mind from trying to remember everything at once.
            </AboutStepParagraph>
          </AboutStep>
          <AboutStep>
            <AboutStepHeading>2. Set the timer</AboutStepHeading>
            <AboutStepParagraph>
              Configure your timer for a focused session, usually 25 minutes. This creates a dedicated period where you
              can work uninterrupted. The countdown acts as a gentle motivator and sets a clear boundary for your
              attention.
            </AboutStepParagraph>
          </AboutStep>
          <AboutStep>
            <AboutStepHeading>3. Focus session</AboutStepHeading>
            <AboutStepParagraph>
              During your focus session, give your full attention to the task. Avoid checking your phone, browsing the
              web, or switching between tasks. If distractions appear, note them down quickly and return to your work.
              The key is consistent, undisturbed focus.
            </AboutStepParagraph>
          </AboutStep>
          <AboutStep>
            <AboutStepHeading>4. Take a short break</AboutStepHeading>
            <AboutStepParagraph>
              When the timer rings, take a 5-minute break. Stand up, stretch, get some water, or just relax your mind.
              This short pause allows your brain to recharge and improves concentration for the next session.
            </AboutStepParagraph>
          </AboutStep>
          <AboutStep>
            <AboutStepHeading>5. Reward yourself</AboutStepHeading>
            <AboutStepParagraph>
              After completing four focus sessions, take a longer break of 15-30 minutes. Use this time to rest, enjoy a
              snack, or take a walk. Repeating this cycle helps you maintain productivity throughout the day while
              preventing burnout. Celebrate your progress and keep adjusting tasks for maximum focus!
            </AboutStepParagraph>
          </AboutStep>
        </AboutSteps>
      </AboutSection>
    </About>
  );
}
