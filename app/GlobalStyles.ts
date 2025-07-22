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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--shadow-light);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}
.modal {
  width: 90%;
  max-width: 35rem;
  max-height: 65vh;
  min-height: 60vh;
  border-radius: 30px;
  border-radius: 1rem;
  padding: 1rem;
  overflow: hidden;
}
.neu-circle {
  border-radius: 50%;
  background: #edecec;
  box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff;
}
.neu-circle-inner {
  position: relative;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 362px;
  width: 362px;
  background: linear-gradient(145deg, #f1efef, #cbc9c9);
  box-shadow: 15px 15px 30px #b6b6b6, -5px -5px 30px #e4e4e4;
}
.neu-button {
  background: #e7e6e6;
  box-shadow: 10px 10px 20px #989797, -10px -10px 22px #eeeded;
}
.neu-button:active {
  background: #e9e6e6;
  box-shadow: inset 6px 6px 13px #c8c6c6, inset -6px -6px 13px #faf8f8;
}
.neu-button-active {
  border-radius: 40px;
  background: #e1dfdf;
  box-shadow: inset 6px 6px 13px #c8c6c6, inset -6px -6px 13px #faf8f8;
}

.neu-mode-inner {
  background: #f4f4f4ff;
  box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff;
}

.neu-input-inner {
  border-radius: 30px;
  box-shadow: inset 5px 5px 10px #e1e0e0, inset -5px -5px 10px #f9f8f8;
}
.neu-input-inner:focus {
  box-shadow: inset 5px 5px 10px #c7c7c7, inset -5px -5px 10px #e8e8e8;
}
.neu-modal {
  background: linear-gradient(145deg, #f8f8f8, #ededed);
  box-shadow: 12px 12px 27px #adacac, -12px -12px 27px #dedede;
}
`;
