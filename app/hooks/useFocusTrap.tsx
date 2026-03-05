import { useEffect } from "react";

export const useFocusTrap = (containerRef: React.RefObject<HTMLElement>, isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const handleFocus = (e: FocusEvent) => {
      if (!container.contains(e.target as Node)) {
        container.focus();
      }
    };

    document.addEventListener("focusin", handleFocus);

    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, [containerRef, isActive]);
};
