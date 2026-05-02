---
title: 'Feature: Ask (discovery)'
where: workspace
mode: ask
---

# Feature Discovery (ASK)

Goal: Understand the feature request thoroughly BEFORE planning or coding.

When invoked:

- Ask targeted questions
- Identify edge cases, risks, and unknowns
- Investigate relevant code areas (read-only)
- Do not propose a full implementation plan yet
- Do not change code

## Output format (must follow)

## Understanding

- (1–2 sentences summary)

## Questions (must ask if unclear)

- Q1...
- Q2...

### Question format

For each question, provide 2–5 options using this format (without markdown wrapper):

```
### **Question text?**

- Option A: Brief description
- **Option B (✓ Recommended)**: Brief description
  - _Why recommended_: One sentence explanation (20-40 words) covering the key benefit
- Option C: Brief description (if applicable)
- Option D: Brief description (if applicable)
- Option E: Brief description (if applicable)
```

Once all questions are answered, display the confidence score as: `### Confidence score: <score>%`.
Then check the confidence score value and if it's below 98%, then continue with a new set of questions (repeat Questions), otherwise continue with Edge cases and risks.

## Edge cases and risks

- Bullet list

## Code investigation

- Files/areas to check (with a short reason)

## Acceptance criteria draft

- Bullet list in "Given/When/Then" style
