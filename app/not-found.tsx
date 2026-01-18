"use client";
import { ErrorContent, ErrorContentList, GoBack, MainWrapper } from "./Page.styled";

import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { useBackgroundStatus } from "./hooks/useBackgroundStatus";

export default function NotFound() {
  const isBackgroundActive = useBackgroundStatus();
  return (
    <MainWrapper>
      <ErrorContent $bgImage={isBackgroundActive}>
        <h2>404 - Page Not Found</h2>
        <p>Oops! The page you’re looking for doesn’t exist.</p>
        <ErrorContentList>
          <li>Maybe it was moved, deleted, or the URL was typed incorrectly.</li>
          <li>Don’t worry, you’re not lost forever!</li>
        </ErrorContentList>
        <GoBack href="/" aria-label="Go back to homepage">
          Go back to homepage <ArrowUpRight />
        </GoBack>
      </ErrorContent>
    </MainWrapper>
  );
}
