"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
  --color-text: #333333;
  --color-highlight: #b62c0a;
  --color-button-text: #252525;
  --color-button-text-disabled: #969494f2;
  --color-glass: #ffffff33;
  --color-modal: #fffffff2;
  --clor-alert: rgb(250, 19, 19);
  --shadow-light: 0 4px 12px #0000001a;
  --shadow-medium: 0 8px 24px #00000026;
  --border-radius: 12px;
  --transition: all 0.3s ease-in-out;
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
  overflow-y: scroll;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: "Arial", sans-serif;
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

#root,
#__next {
  isolation: isolate;
}

body {
  min-height: 100vh;
  background-color: #e1dfdf;
  color: var(--color-text);
  position: relative;
  transition: var(--transition);
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
`;
