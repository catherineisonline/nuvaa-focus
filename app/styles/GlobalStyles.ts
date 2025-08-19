"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle<{
  $bgImage?: string;
  $backgroundDim: number;
  $backgroundBlur: number;
}>`
:root {
  --color-glass: #ffffff33;
  --background-glass: #ffffff0a;
  --shadow-light: 0 4px 12px #0000001a;
  --shadow-medium: 0 8px 24px #00000026;
  --border-radius: 12px;
  --transition: all 0.3s ease-in-out;
  --hover-transform: translateY(-3px);
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
body {
  -ms-overflow-style: none;
  scrollbar-width: none;
  line-height: 1.5;
  min-height: 100dvh;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-lexend);
  overflow: hidden;

}
body::-webkit-scrollbar {
  display: none;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
img {
  display: block;
}

ul,
ol,
li {
  padding: 0;
  margin: 0;
}
input,
button,
textarea,
select {
  font: inherit;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
a {
text-decoration: none;
}
#root,
#__next {
  isolation: isolate;
}

body {
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
   background-image: ${({ $bgImage }) =>
     $bgImage ? `url(${$bgImage})` : "none"};
   background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  position: relative;
  transition: var(--transition);
 ${({ $bgImage, $backgroundBlur, $backgroundDim }) =>
   $bgImage &&
   `&::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(${$backgroundBlur}px);
      background-color: rgba(255, 255, 255, ${$backgroundDim});
      z-index: -1;
      pointer-events: none;
    }
  `}
}

h2,
h3,
h4,
time,
label,
select {
  font-family: var(--font-outfit);
  font-weight: 800;
}
p {
  font-family: var(--font-lexend);
  font-weight: 800;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;
