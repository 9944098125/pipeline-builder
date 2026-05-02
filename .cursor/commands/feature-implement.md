---
title: 'Feature: Implement (coding)'
where: workspace
mode: agent
---

# Implement Feature (AGENT)

Goal: Implement strictly from the approved plan.

Rules:

- Follow the "Feature: Plan" document as source of truth.
- Obey all existing Cursor rules in the repo.
- Keep changes minimal and focused.
- Prefer small commits logically grouped (but do not commit unless user asked).
- Add/update tests as specified in the plan.
- Always run and fix typecheck (pnpm run typecheck) and lint (pnpm run lint).

## Execution checklist

- [ ] Implement core logic
- [ ] Update UI wiring
- [ ] Update docs/config if needed
- [ ] Add/update tests

## Output at end

- Summary of changes
- List of files changed
- Notes on any deviations from plan (and why)
