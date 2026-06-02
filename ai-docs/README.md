# ai-docs

This directory contains reference material for **AI agents** (Claude Code, Cursor, and others).
It is not intended for human readers — use `docs/guide/` for designer-facing documentation.

## Contents

| File                                       | Purpose                                                                                       |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [development-flow.md](development-flow.md) | Step-by-step implementation flow for each request type (screen / form / component / api-sync) |
| [conventions.md](conventions.md)           | Summary of directory boundaries, naming rules, required UI states, and type/lint constraints  |

## Source of Truth

The authoritative rules for this repository are in `.claude/rules/`:

```
.claude/rules/
├── 00-project-overview.md    # Stack and app structure
├── 01-ai-safety.md           # What AI must NOT do
├── 02-directory-boundary.md  # Layer responsibilities
├── 03-ui-implementation.md   # Component hierarchy and styling
├── 04-api-client.md          # API client conventions
├── 05-auth.md                # Auth usage patterns
├── 06-form.md                # Form implementation standard
├── 07-testing.md             # Test pyramid and rules
├── 08-ci.md                  # CI workflow overview
├── 09-designer-workflow.md   # Request format and AI behavior after implementation
└── 10-forbidden-changes.md   # Absolute prohibitions enforced by guard script
```

Use this `ai-docs/` directory for higher-level, tool-agnostic workflow guidance that applies to any AI coding assistant. For Claude Code-specific skill runbooks, see `.claude/skills/`.

## Human-Facing Docs

- Designer guides: `docs/guide/` ([ja](../docs/guide/ja/01-overview.md) / [en](../docs/guide/en/01-overview.md))
- AI request templates (filled by designers): `docs/ai/`
