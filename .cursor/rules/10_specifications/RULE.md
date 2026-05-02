---
globs: docs/**/*.md
alwaysApply: false
---

# Documentation and Specification Standards

This rule defines comprehensive standards for all documentation in the repository, including product requirements, business specifications, and architecture documentation.

## Documentation Structure

```
docs/
├── 00-meta/                    # Meta-documentation
│   ├── index.md               # Documentation registry (ID tracking)
│   ├── discovery/             # Research and discovery documents
│   │   ├── integrations/
│   │   ├── features/
│   │   └── technical/
│   └── templates/             # Document templates
│       ├── REQ-XXX-template.md
│       ├── EPIC-XXX-template.md
│       └── ARCH-XXX-template.md
├── 01-product-requirements/   # Raw product requirements (REQ-XXX)
├── 02-business-specification/ # Business specs and data model
│   ├── data-model.md         # Single source of truth for entities/fields
│   ├── modules/              # Feature specifications (EPIC-XXX)
│   ├── workflows/            # Business process flows
│   ├── personas/             # User role definitions
│   └── integrations/         # Integration business goals
├── 03-architecture/           # Architecture decisions and patterns
│   ├── decisions/            # Architecture Decision Records (ARCH-XXX)
│   ├── integrations/         # Integration technical designs
│   └── patterns/             # Reusable architecture patterns
├── glossary.md               # Project glossary
├── project-scope.md          # Project scope definition
├── project-brief.md          # Project overview and onboarding
├── business-goals.md         # Business goals and KPIs
├── documentation-workflow.md # Documentation process
└── implementation-workflow.md # Engineering process
```

## ID Assignment and Naming Conventions

### Strict Naming Rules

All documentation files MUST follow these naming conventions:

- **Product Requirements**: `REQ-XXX-{descriptive-name}.md` (e.g., `REQ-001-argyle-integration.md`)
- **Business Specifications**: `EPIC-XXX-{descriptive-name}.md` (e.g., `EPIC-001-income-verification.md`)
- **Architecture Decisions**: `ARCH-XXX-{descriptive-name}.md` (e.g., `ARCH-001-multi-tenant-strategy.md`)
- **Discovery Documents**: `{descriptive-name}-discovery.md` (e.g., `argyle-integration-discovery.md`)

### ID Registry

**CRITICAL**: Before creating any new REQ, EPIC, or ARCH document:

1. Check `docs/00-meta/index.md` for next available ID
2. Add your document to the index in the same commit
3. Use the assigned ID consistently across all references

This prevents ID collisions and ensures traceability.

## Documentation Types

### 1. Product Requirements (REQ-XXX)

**Purpose**: Initial capture of product ideas, feature requests, and high-level requirements

**Location**: `docs/01-product-requirements/REQ-XXX-{name}.md`

**Owner**: Product Owner

**Template**: Use `docs/00-meta/templates/REQ-XXX-template.md`

**Key Sections**:

- Executive Summary
- Background and Opportunity
- Stakeholder Input
- High-Level Requirements (MoSCoW)
- Initial Acceptance Criteria
- Constraints
- Open Questions

### 2. Business Specifications (EPIC-XXX)

**Purpose**: Business-focused documentation describing the "Why", "What", and "How" from a business perspective

**Location**: `docs/02-business-specification/modules/{domain}/EPIC-XXX-{name}.md`

**Owner**: Product Manager

**Template**: Use `docs/00-meta/templates/EPIC-XXX-template.md`

**Key Sections**:

- Summary
- Users & Personas
- User Needs / Jobs-to-be-Done
- Business Value
- User Stories with Acceptance Criteria
- Business Rules
- Business Process Flow
- Success Metrics
- Data Requirements (reference data-model.md)

**Related Documents**:

- **Data Model**: `docs/02-business-specification/data-model.md` - Single source of truth for entities and fields
- **Workflows**: `docs/02-business-specification/workflows/` - Business process flows
- **Personas**: `docs/02-business-specification/personas/` - User role definitions
- **Integrations**: `docs/02-business-specification/integrations/` - Integration business goals

### 3. Architecture Documentation (ARCH-XXX)

**Purpose**: Technical design, architecture patterns, and implementation guidance

**Location**: `docs/03-architecture/decisions/ARCH-XXX-{name}.md`

**Owner**: Tech Lead

**Template**: Use `docs/00-meta/templates/ARCH-XXX-template.md`

**Key Sections**:

- Context and Decision
- Rationale and Trade-offs
- Alternatives Considered
- Technical Design
- Data Model Impact (reference data-model.md)
- Integration Points
- Implementation Guidelines
- Security and Performance Considerations
- Testing Strategy
- Risks and Mitigation

**Related Folders**:

- **Decisions**: `docs/03-architecture/decisions/` - Architecture Decision Records
- **Integrations**: `docs/03-architecture/integrations/` - Integration technical designs
- **Patterns**: `docs/03-architecture/patterns/` - Reusable patterns

### 4. Discovery Documents

**Purpose**: Research and exploration before formal specification

**Location**: `docs/00-meta/discovery/{integrations|features|technical}/{name}-discovery.md`

**Owner**: PM, TL, or Engineer (depending on type)

**When to Create**:

- Requirement is too vague to spec directly
- Need to research third-party capabilities
- Exploring technical feasibility
- Evaluating multiple approaches

**Key Sections**:

- Research Question/Goal
- Findings and Analysis
- Options with Pros/Cons
- Recommended Approach
- Next Steps

**Process**:

1. PM creates product requirement (REQ-XXX)
2. PM/TL/Engineer conducts discovery
3. Discovery document captures findings
4. PM creates business specification (EPIC-XXX) based on discovery
5. TL creates architecture (ARCH-XXX) based on discovery

## Data Model as Source of Truth

The data model (`docs/02-business-specification/data-model.md`) is the **single source of truth** for all entity and field names.

### Key Principles

1. **Authoritative Naming**: All documents (business specs, architecture, code) MUST use exact entity and field names from data model
2. **Single Location**: Data model lives only in business specification folder
3. **Update Process**: Changes must be made to data model FIRST, then propagated to other documents and code

### Naming Rules from Data Model

- **Entity names**: PascalCase (e.g., `Funnel`, `Contact`, `Loan`)
- **Field names**: camelCase (e.g., `funnelId`, `firstName`, `lastName`)
- **API endpoints**: kebab-case (e.g., `funnel-list`, `contact-create`)
- **File names**: kebab-case (e.g., `funnel-service.ts`)

### Data Model Change Workflow

1. **Propose Change**: Engineer, TL, or PM proposes change to PM
2. **Edit Data Model**: PM edits `data-model.md`
3. **Notify Team**: PM notifies affected team members
4. **Update Artifacts**: Update business specs, architecture, and code
5. **Code Review**: Reviewers verify alignment with data model

## Discovery Workflow

### When to Use Discovery Phase

Use discovery when:

- Requirement is vague or high-level
- Need to research third-party capabilities
- Multiple technical approaches exist
- Significant unknowns or risks

### Discovery Process

1. **Create Product Requirement** (PM)

- Document in `docs/01-product-requirements/REQ-XXX-{name}.md`
- Capture high-level need and context

2. **Conduct Discovery** (PM + TL + Engineer collaboration)

- Research capabilities, constraints, options
- Document findings in `docs/00-meta/discovery/{type}/{name}-discovery.md`
- Include: findings, options analysis, recommendations

3. **Create Business Specification** (PM)

- Translate discovery + requirement → `docs/02-business-specification/modules/{domain}/EPIC-XXX-{name}.md`
- Reference discovery document

4. **Create Architecture Design** (TL)

- Create technical design in `docs/03-architecture/{decisions|integrations}/ARCH-XXX-{name}.md`
- Reference discovery document

5. **Implement** (Engineer)

- Use business spec + architecture + discovery as inputs
- Follow implementation workflow

### Engineer Involvement in Discovery

Engineers should be involved during technical discovery phase:

- Identify implementation risks and constraints early
- Validate technical feasibility
- Build understanding of "why" before "how"
- Contribute technical expertise to decision-making

## Diagram Standards

### Mermaid Diagram Requirements

1. **No Examples**: Diagrams must represent actual system behavior, not examples
2. **Node Labels**: Always use quoted strings: `["Label"]` or `{"Label"}`
3. **Consistency**: Use consistent node shapes for similar concepts
4. **Clarity**: Diagrams should be readable without additional context
5. **Updates**: Diagrams must be updated when system changes

### Diagram Types

- **Flowchart**: Process flows, workflows
- **ER Diagram**: Data model relationships
- **Sequence Diagram**: API interactions, message flows
- **State Diagram**: State transitions

## Quality Checklist

### Before Committing Documentation

- [ ] Document uses correct template
- [ ] ID is registered in `docs/00-meta/index.md`
- [ ] File name follows naming conventions
- [ ] All entity names match data model
- [ ] All field names match data model
- [ ] All diagrams use quoted node labels
- [ ] All cross-references are valid
- [ ] Source requirements are referenced
- [ ] Diagrams represent actual system (not examples)

## Related Rules

- [Product Requirements](../11_product-requirements/RULE.md) - Detailed product requirement guidelines
- [Business Specification](../13_business-specification/RULE.md) - Detailed business spec guidelines
- [Architecture Specification](../12_architecture-specification/RULE.md) - Detailed architecture guidelines
