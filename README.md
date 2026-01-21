# Nuvaa Focus [![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

**Nuvaa Focus** is a focus timer app designed to help users stay focused and manage their time effectively. It offers a clean, distraction-free interface and a range of features to optimize productivity, including customizable timers, task management, and ADHD-friendly themes.

## 🔗 [Live preview](https://nuvaa-focus.vercel.app/)

## ⛵️ Navigating Around

This repository is primarily a **showcase of the Nuvaa Focus website**.  
It demonstrates selected features, design decisions, and overall architecture for portfolio purposes.

The project is intentionally **not a full public release**.  
Only representative parts of the codebase are included to highlight how the application is structured and how key features are implemented.

Each main folder contains its own `README` file explaining:

- what that part of the code is responsible for
- which sections are fully included
- and which parts are intentionally omitted or simplified for demonstration

The complete source code is kept **private by design**.  
However, **recruiters, potential employers, or collaborators** are welcome to contact me directly to discuss the implementation in more detail or review additional examples.

Thank you for your understanding.

## ✨ Features

### User Authentication

- **User Accounts** - Secure access to personal data
- **Registration** - Create a new user account
- **Login** - Authenticate users with email and password
- **JWT Sessions** - Maintain logged-in state using JSON Web Tokens
- **Password Security** - Passwords are securely hashed with bcrypt

### Profile Management

- **View Profile** - Access user profile information
- **Edit Profile** - Update personal details
- **Account Deletion** - Permanently delete user account and related data

### Focus Timer

- **Focus Time** - Track focused work sessions
- **Short Break** - Set a short break after each focus session
- **Long Break** - Take a longer break after a set number of focus sessions
- **Custom Time** - Customize focus and break durations to fit your preferences
- **Auto-Continue** - Automatically transition between focus, short break, and long break

### Task Management

- **Add Tasks** - Create new tasks
- **Edit Tasks** - Update existing task details
- **Delete Tasks** - Remove tasks from your list
- **Mark as Complete** - Track completed tasks
- **Current Task Highlighting** - See your active task while focusing

### Stopwatch & Time Display

- **Stopwatch Mode** - Track time outside of focus mode
- **Regular Clock** - Display current time in the interface

### Themes

- Choose between **soft, ADHD-friendly color themes** to personalize your experience

### Persistent Storage

- **Local Storage** - All settings, tasks, and preferences are saved in your browser
- **State Management** - Powered by Redux Toolkit for consistent performance

## 🛠 Tech Stack

- [Next.js 15.3+](https://nextjs.org/docs) - React framework with App Router (SSR/SSG support)
- [Redux Toolkit](https://redux-toolkit.js.org/) - Modern state management
- [Styled Components](https://styled-components.com/) - CSS-in-JS for custom theming
- [Lucide](https://lucide.dev/) - Icon library
- [@dnd-kit/core + @dnd-kit/sortable](https://dndkit.com/) - Drag-and-drop support for task management
- [React Select](https://react-select.com/) - Select Input control for ReactJS
- [Recharts](https://recharts.org/en-US) - A composable charting library built on React components

### Additional resources

- [Neumorphism](https://neumorphism.io/) - Generate neumorphic designs

## 📝 Branch Naming Rules

Naming conventions for branches:

- `feature/<short-description>` - For new features  
  _Example_: `feature/login-form`, `feature/add-theme-switcher`

- `bugfix/<short-description>` - For fixing bugs  
  _Example_: `bugfix/fix-login-crash`, `bugfix/missing-icon`

- `hotfix/<short-description>` - For quick critical fixes  
  _Example_: `hotfix/fix-deploy-error`

- `refactor/<short-description>` - For improving code without changing behavior  
  _Example_: `refactor/cleanup-utils`, `refactor/rewrite-auth`

- `chore/<short-description>` - For non-feature tasks like updating dependencies  
  _Example_: `chore/update-eslint`, `chore/rename-files`

## 🚫 License & Usage Notice

This project is protected under the **CC BY-NC-ND 4.0 License**.
