# Skill: pr-review

## Purpose

Self-review a PR before requesting merge. Run this before every PR.

## Checklist

Run through each item. If any are "no", fix before creating the PR.

### Safety

- [ ] Only files related to the requested change are modified
- [ ] `backend/rapid-go/` is not modified
- [ ] `packages/api-client/src/generated/` was not manually edited
- [ ] No new `eslint-disable` comments
- [ ] No new `: any` types

### Quality

- [ ] Loading state is implemented
- [ ] Error state is implemented
- [ ] Empty state is implemented (if data-fetching component)
- [ ] Mobile layout works at 375px
- [ ] Form validation messages are user-friendly

### Testing

- [ ] Storybook story exists for new/changed components
- [ ] Unit test exists for new hooks / utilities
- [ ] `pnpm check` passes locally

### Process

- [ ] PR description explains what and why
- [ ] Screenshots added for UI changes
- [ ] No `.env.local` or secrets committed

## Run pnpm check

```bash
pnpm check
```

All checks must pass before the PR is ready.
