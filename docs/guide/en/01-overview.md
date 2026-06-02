# 1. Overview

## What is this template?

This repository is a **template for designers and AI to collaboratively build a React frontend safely**.

It is designed so that designers can request screens from AI (Claude Code / Cursor) one at a time, and development can proceed with quality even in small teams without dedicated frontend engineers.

## Roles

| Person                    | Role                                                       |
| ------------------------- | ---------------------------------------------------------- |
| Lead Engineer             | Backend (rapid-go) and infrastructure design & setup       |
| Designer                  | Writing AI requests, checking designs, verifying behavior  |
| AI (Claude Code / Cursor) | Implementing code, writing tests, adding Storybook stories |

The designer's main role is to decide **what to build** and communicate it to the AI. No code-writing required.

## Apps

| App   | URL                   | Purpose           |
| ----- | --------------------- | ----------------- |
| admin | http://localhost:3001 | Admin panel       |
| web   | http://localhost:3000 | Public-facing app |

## Reading Order

1. This file (Overview)
2. [02-local-setup.md](02-local-setup.md) — How to run the apps locally
3. [03-request-flow.md](03-request-flow.md) — The development loop
4. [04-screen-request.md](04-screen-request.md) — How to request screens and features
5. [05-storybook.md](05-storybook.md) — How to check UI states in Storybook
6. [06-pr-checklist.md](06-pr-checklist.md) — What to verify before merging
