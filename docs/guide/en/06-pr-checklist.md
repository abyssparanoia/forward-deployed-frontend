# 6. PR Checklist

## Run `pnpm check` First

```bash
pnpm check
```

Confirm all checks pass before creating a PR.

## Visual Review Checklist

- [ ] The screen works correctly in mock mode
- [ ] Loading, error, and empty states display correctly
- [ ] Layout is not broken at mobile size
- [ ] Storybook stories are added
- [ ] No unrelated files were changed

## Forbidden Changes

These changes will fail CI and block merging:

| Forbidden                                             | Reason                               |
| ----------------------------------------------------- | ------------------------------------ |
| Editing files in `backend/rapid-go/`                  | Backend is read-only                 |
| Manually editing `packages/api-client/src/generated/` | Auto-generated — use `pnpm api:sync` |
| Removing keys from `.env.example`                     | Breaks other developers' setup       |
| Adding `eslint-disable` comments                      | Hides the root cause of errors       |
| Adding `: any` types                                  | Breaks type safety                   |
| Deleting test files                                   | Reduces coverage                     |
| Deleting Storybook story files                        | Removes visual regression coverage   |
| Deleting CI workflow files                            | Removes safety checks                |

## Creating the PR

When everything looks good, create a PR. Ask the AI to draft the description, or write one that includes:

- What was added or changed
- How to test it
- Screenshots (for UI changes)
