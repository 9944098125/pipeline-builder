---
globs: *.tsx, *.ts
alwaysApply: false
---

# React Best Practices

## Component Props

```tsx
type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Component({
  title,
  description,
  children,
  className,
  onClick,
}: Props) {
  // Component implementation
}
```

## Component Structure

- Use functional components, no class components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Implement a proper prop type with TypeScript
- Split large components into smaller, focused ones

## Hooks

- Follow the Rules of Hooks
- Use custom hooks for reusable logic
- Keep hooks focused and simple
- Use appropriate dependency arrays in useEffect
- Implement cleanup in useEffect when needed
- Avoid nested hooks

## State Management

- Use useState for local component state
- Use Context API for shared state
- Keep the state as close to where it's used as possible
- Avoid prop drilling through proper state management
- Use state management libraries only when necessary

## Performance

- Implement proper memoization (useMemo, useCallback)
- Avoid unnecessary re-renders
- Use proper key props in lists
- Profile and optimize render performance

## Forms

- Prefer react-hook-form for non-trivial forms (performance and ergonomics)
- Use predefined components for controlling inputs (libs/design-system):
- Use zod as the single source of truth for validation rules
- Keep schemas close to the domain model; reuse schemas across FE/BE when possible
- Validate:
  - on submit by default
  - on change/blur only when UX requires it
- Always handle:
  - submit loading state
  - disable/lock UI to prevent double submit
  - server error mapping (field errors + form-level error)
- Accessibility:
  - associate labels, aria-invalid, and error messages (aria-describedby)
  - preserve focus on first invalid field when submitting

## Error Handling

- Implement Error Boundaries via React-Error-Boundary
- Handle async errors properly
- Show user-friendly error messages
- Implement a proper fallback UI
- Log errors appropriately
- Handle edge cases gracefully

## Testing

- Write unit tests for components
- Implement integration tests for complex flows
- Use React Testing Library
- Test user interactions
- Test error scenarios
- Implement proper mock data

## Accessibility

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Handle focus management
- Provide proper alt text for images

## Code Organization

- Group related components together
- Use proper file naming conventions
- Implement proper directory structure
- Keep styles close to components
- Use proper imports/exports
- Document complex component logic
