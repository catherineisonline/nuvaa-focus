import BicepsFlexed from "lucide-react/dist/esm/icons/biceps-flexed";
import BookOpenCheck from "lucide-react/dist/esm/icons/book-open-check";
import HandHeart from "lucide-react/dist/esm/icons/hand-heart";
import Hourglass from "lucide-react/dist/esm/icons/hourglass";
import Repeat from "lucide-react/dist/esm/icons/repeat";

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

export const ONBOARDING_STEPS = [
  {
    icon: HandHeart,
    title: "Welcome to Nuvaa Focus",
    content: "Your cozy ADHD-friendly focus timer designed to help you focus with comfort and ease.",
  },
  {
    icon: BookOpenCheck,
    title: "Pick a Task",
    content: "Start by adding tasks to your list. Choose one to focus on during your session.",
  },
  {
    icon: Hourglass,
    title: "Start Your Timer",
    content: "Begin with a 25-minute focus session. The timer will guide you through work and break periods.",
  },
  {
    icon: BicepsFlexed,
    title: "Work Distraction-Free",
    content: "Focus completely on your chosen task. Avoid distractions and interruptions during this time.",
  },
  {
    icon: Repeat,
    title: "Take Breaks & Repeat",
    content: "Enjoy 5-minute breaks between sessions. After 4 focus sessions, take a longer 15-30 minute break.",
  },
];
