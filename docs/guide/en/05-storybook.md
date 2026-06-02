# 5. Reviewing UI in Storybook

## What is Storybook?

Storybook is a tool that lets you browse all UI states of each screen and component in a browser.

Without connecting to a real backend, you can verify:

| State   | What you see                          |
| ------- | ------------------------------------- |
| Default | Data loaded successfully              |
| Loading | Spinner shown while fetching          |
| Error   | Error message when an API call fails  |
| Empty   | Message when there is no data         |
| Mobile  | Layout at a small (phone) screen size |

## How to Start

```bash
pnpm storybook
```

Open http://localhost:6007.

## How to Navigate

1. Pick a component or screen from the left sidebar.
2. Switch between states using the **Stories** tab at the top.
3. Change screen size using the viewport toggle in the Addons panel on the right.

## Checking Screen Sizes

Use the Storybook viewport toggle or browser DevTools to test responsive layouts.

Key sizes to check:

| Size    | Width  |
| ------- | ------ |
| Mobile  | 375px  |
| Tablet  | 768px  |
| Desktop | 1280px |

## After a New Screen is Implemented

After the AI implements a screen, new stories are added to Storybook. Verify:

- [ ] Default state looks correct
- [ ] Loading spinner displays
- [ ] Error message displays
- [ ] Empty state message displays
- [ ] Layout is not broken at mobile size
