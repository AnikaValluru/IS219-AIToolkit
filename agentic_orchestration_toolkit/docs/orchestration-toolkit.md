# Orchestration Toolkit (Quick Reference)

Use this page as a fast checklist for agentic orchestration.

## Mindset

You are the CEO managing a workforce of AI experts. Your role is strategy, taste, and context management. Think like a sommelier (selecting the right model for the job) and a barista (making the process repeatable).

## Core Loop

1. Define outcome and constraints.
2. Select tools and enforce usage.
3. Execute in small steps.
4. Inspect outputs.
5. Iterate until stable.

## Techniques

- **Goal + constraints:** Name the outcome, constraints, and output locations.
- **Tool-first:** Tell the agent which tools to use.
- **Expert-lens review:** Anchor critique to a framework or philosophy.
- **Adversarial review:** Ask for failure modes and mitigations.
- **Constraint inversion:** Flip a key constraint and re-architect.
- **Artifact-first:** List files/outputs before implementation.
- **Dogfood:** Run the tool immediately and fix issues.

## Checklists

### Dogfood

- Run the command with real inputs.
- Confirm output location and naming.
- Inspect output correctness.
- Fix issues and rerun.

### Expert-Lens

- Name the framework (brutalism, SOLID, accessibility, etc.).
- Ask for findings before solutions.
- Require actionable fixes.

### Adversarial

- Ask for failure modes.
- Require mitigations.
- Re-test after fixes.

### Constraint Inversion

- Flip a core constraint (offline, no API, no file system).
- Identify breakpoints.
- Re-architect the weakest link.

### Artifact-First

- List required files.
- Define names and locations.
- Implement only after the list is agreed.
