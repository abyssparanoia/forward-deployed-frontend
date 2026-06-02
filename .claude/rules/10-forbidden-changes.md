# Forbidden Changes

The `pnpm guard:forbidden-changes` script detects these automatically.
CI will fail if any of these are present.

## Absolute Prohibitions

| Change                                                | Why                                    |
| ----------------------------------------------------- | -------------------------------------- |
| Modifying `backend/rapid-go/`                         | It's a read-only submodule             |
| Manually editing `packages/api-client/src/generated/` | Auto-generated; use `pnpm api:sync`    |
| Removing keys from `.env.example`                     | Breaks other developers' setups        |
| Changing `packageManager` from pnpm                   | CI and lockfile format depend on pnpm  |
| Adding `eslint-disable` comments                      | Hides real problems                    |
| Adding `: any` types                                  | Breaks type safety                     |
| Deleting test files                                   | Reduces coverage without fixing issues |
| Deleting Storybook story files                        | Removes visual regression coverage     |
| Deleting CI workflow files                            | Removes safety checks                  |

## Common Mistakes

- **Fixing a lint error by disabling it** → Fix the code instead
- **Removing a test that's hard to fix** → Fix the test or ask for help
- **Editing generated types to match a new API** → Run `pnpm api:sync` instead
- **Adding Firebase SDK calls in a page** → Use `useAuth()` instead
