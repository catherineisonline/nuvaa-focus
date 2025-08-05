export const MAX_FILE_SIZE_MB = 2;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MOTIVATIONAL_QUOTES = [
  "Focus is not about doing more, it's about doing what matters",
  "Small steps lead to big changes",
  "Your future self will thank you for the work you do today",
  "Progress, not perfection",
  "Every moment of focus is a gift to yourself",
  "Breathe, focus, achieve",
  "You've got this! One pomodoro at a time",
  "Deep work creates deep satisfaction",
  "Clarity comes from focused attention",
  "The best time to focus is now",
];

export const TIMER_OPTIONS = Array.from({ length: 480 }, (_, i) => ({
  value: (i + 1) * 60,
  label: i === 0 ? "1 Minute" : `${i + 1} Minutes`,
}));
