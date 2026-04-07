# AI Orchestration Playbook

This playbook shows how to structure prompts and workflows so an AI agent can reliably execute multi-step tasks.

## How to Use This Playbook

1. Read "What AI Orchestration Is" and "Why It Works."
2. Use the Core Principles as a checklist while building.
3. Apply the checklists during dogfooding and review.

## Suggested Order

1. Playbook
2. Toolkit quick reference
3. Build walkthrough

## What AI Orchestration Is

AI orchestration is the discipline of coordinating AI systems to complete real work. It combines goal setting, constraints, tool usage, and iterative review so outputs are consistent and usable.

## Why It Works

- Clear goals and constraints reduce ambiguity.
- Tool-first prompting improves factual accuracy and reproducibility.
- Short feedback loops surface problems early.
- Organized outputs enable reuse and auditing.

## Learning Goals

By the end, students should be able to:
- Define a clear outcome and constraints.
- Select the right tools and enforce their use.
- Run a feedback loop that improves results.
- Produce organized, reusable outputs.

## Core Principles

1. **Outcome first**
   - Define the final artifact and where it should live.
   - Example: "Create a markdown reference in `references/` explaining Gemini 3 image uploads."

2. **Constraints are guardrails**
   - Specify architectural rules, naming, and output folders.
   - Example: "Follow SOLID, keep outputs in `references/`, and use prompt-based filenames."

3. **Tooling is non-negotiable**
   - Instruct the agent to use the available tools, not assumptions.
   - Example: "Use the CLI web-search command to collect sources." 

4. **Short feedback loops**
   - Request changes after a checkpoint instead of in one giant prompt.
   - Example: "Make it brutalist" then "Increase asymmetry and remove polish." 

5. **Separate research from execution**
   - Gather facts first, then implement.
   - Example: "Find the best OpenAI image model, then add `image-generate`."

6. **Dogfood the workflow**
   - Use the tool immediately after building it to catch issues early.
   - Example: "Run the CLI command and keep fixing until it succeeds."

7. **Expert-lens review**
   - Ask for a critique grounded in a specific framework or practitioner's philosophy.
   - Example: "Review this UI using brutalist principles." or "Audit code structure using SOLID-first concerns."

8. **Adversarial review**
   - Ask for a failure-focused critique that tries to break assumptions.
   - Example: "List the top 5 ways this CLI could fail in real use and how to harden it."

9. **Constraint inversion**
   - Flip a constraint to expose tradeoffs and hidden dependencies.
   - Example: "Assume the CLI must work offline. What must change?"

10. **Artifact-first prompting**
   - Specify the exact deliverables before implementation details.
   - Example: "Create three docs: a playbook, a build walkthrough, and an image workflow guide."

## Dogfood Checklist

- Run the new command with real inputs.
- Validate output location and naming.
- Inspect the output for correctness.
- Fix issues and rerun until stable.

## Expert-Lens Checklist

- Name the framework or philosophy (brutalism, SOLID, accessibility, etc.).
- Ask for findings first, not redesigns.
- Request concrete, actionable fixes.

## Adversarial Checklist

- Ask for failure modes, not just improvements.
- Require mitigations for each risk.
- Re-run tests after fixes.

## Constraint Inversion Checklist

- Flip a core constraint (offline, no external APIs, no file system).
- Note which modules break first.
- Re-architect the weakest link.

## Artifact-First Checklist

- List the files or outputs to create.
- Define names and locations up front.
- Only then ask for the implementation steps.

## Prompting Template

Use this template as a starting point:

- **Goal:** What should be produced?
- **Constraints:** Architecture, style, output locations, naming.
- **Tools:** Which commands or APIs must be used.
- **Checkpoints:** When to pause for review.
- **Success criteria:** What “done” looks like.

## Example Prompt

"Build a Node.js CLI toolkit. Use SOLID and a command registry. Add a web-search command that stores results in `references/`. After you implement, run one search and save the output."
