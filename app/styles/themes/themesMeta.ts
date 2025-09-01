export const themeMeta = [
  { name: "primary", highlight: "#b62c0a", backgroundGradientTimer: "linear-gradient(145deg, #f1efef, #cbc9c9)" },
  { name: "calm", highlight: "#1e63b1", backgroundGradientTimer: "linear-gradient(145deg, #dce7f3, #b7d0e7ff)" },
  { name: "peach", highlight: "#d17659", backgroundGradientTimer: "linear-gradient(145deg, #f7e8e1, #e5c9be)" },
  { name: "lilac", highlight: "#9646c0", backgroundGradientTimer: "linear-gradient(145deg, #eee1f6, #ceb9da)" },
  { name: "sunny", highlight: "#ff8f3c", backgroundGradientTimer: "linear-gradient(145deg, #fce7d5, #ecdfd4ff)" },
  { name: "lime", highlight: "#96b40f", backgroundGradientTimer: "linear-gradient(145deg, #e6f7d1, #daeacaff)" },
  { name: "breeze", highlight: "#28c7a5", backgroundGradientTimer: "linear-gradient(145deg, #d7f8ef, #b8e8dc)" },
  { name: "ocean", highlight: "#007a99", backgroundGradientTimer: "linear-gradient(145deg, #d5edf5, #a5cfd9)" },
  { name: "sand", highlight: "#bf5a3c", backgroundGradientTimer: "linear-gradient(145deg, #f4e7df, #d9c7bd)" },
  { name: "moss", highlight: "#5b7b2d", backgroundGradientTimer: "linear-gradient(145deg, #e1e5dd, #c5c8bf)" },
] as const;

export type ThemeName = (typeof themeMeta)[number]["name"];
