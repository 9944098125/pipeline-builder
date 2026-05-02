---
title: 'Feature: Test & Fix'
where: workspace
mode: agent
---

# Test & Fix (AGENT)

Goal: Verify functionality and make tests green.

Rules:

- Run pnpm run test.
- If tests fail, fix the root cause (not snapshots-only unless justified).
- Do not introduce unrelated refactors.
- Keep iterating until tests pass.

## Output format

## Commands run

- `pnpm run test`

## Failures found

- ...

## Fixes applied

- ...

## Final status

- ✅ All tests passing / ❌ Remaining issues (with blockers)
