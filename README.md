# Super Awesome To-Do Tracker

A simple and efficient to-do tracking application built with Vite + React and TypeScript.

For a full rational behind the choices and intents of this project checkout the
[ARCHITECTURE.md](ARCHITECTURE.md) doc.

## Setup

This guide assumes you have [Node v24](https://nodejs.org/en/download) installed or are otherwise
using [NVM](https://nodejs.org/en/download).

1. Run `nvm install` to install the appropriate version of Node.js.
2. Run `npm i` to install relevant packages.

## Running This Repo

| Command            | Description                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `npm run dev`      | Start a local developer server that is accessible from http://localhost:5173/super-aweesome-todo-tracker.  |
| `npm run build`    | Build the site for production and place it in a `build` folder in the root directory.                      |
| `npm run preview`  | Start a local production server that is accessible from http://localhost:4173/super-aweesome-todo-tracker. |
| `npm run test`     | Start the test server in your terminal.                                                                    |
| `npm run lint`     | Runs all lint commands in sequence: CSS, TS, JS.                                                           |
| `npm run lint:css` | Alert you of any SCSS linter errors and will automatically fix them.                                       |
| `npm run lint:js`  | Alert you of any JS linter errors and will automatically fix them.                                         |
| `npm run lint:ts`  | Alert you of any TypeScript errors and will automatically fix them.                                        |
| `npm run pretty`   | Will run through all compatible files and format them based on Prettier's configuration.                   |
