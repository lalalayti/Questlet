# Questlet 📟

Questlet was inspired by the frustration of sticky-note task lists that either clutter your workspace when pinned on top or disappear behind multiple open windows. It was designed as a simple desktop-level task widget that stays out of the way.

## Features

- Desktop-level widget with no taskbar presence
- Add, complete, and delete tasks
- Automatically saves tasks locally
- Carries unfinished tasks to the next day
- Daily progress tracking
- Scrollable task list
- Draggable anywhere on the desktop
- Compact pixel-art interface

## Built With

- Tauri
- React
- TypeScript
- Rust
- CSS

## Download

[Download Questlet for Windows](./releases/desktop-todo.exe)

## Exiting Questlet

Since Questlet has no traditional window controls or taskbar presence, press **Alt + F4** while the widget is focused to exit. Alternatively, you can end the Questlet process through **Task Manager**.

## Run Locally

```bash
npm install
npm run tauri dev
