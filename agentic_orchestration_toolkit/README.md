# CLI AI Toolkit

A SOLID-friendly Node.js CLI for AI utilities. It provides repeatable commands for research, model feedback, and image generation, with outputs saved in a predictable structure.

Live site: https://kaw393939.github.io/agentic_orchestration_toolkit/

## Start Here (Build From Scratch)

You will rebuild this toolkit yourself. The finished project is a reference, not a shortcut.

1. Read the playbook and quick reference.
2. Follow the build walkthrough step-by-step.
3. Dogfood each command and log results.

- [AI orchestration playbook](docs/orchestration-playbook.md)
- [Orchestration toolkit quick reference](docs/orchestration-toolkit.md)
- [Toolkit build walkthrough](docs/toolkit-build-walkthrough.md)
- [Image generation workflow](docs/image-generation-workflow.md)

## What You Will Build

- **Web research:** `web-search` saves results in `references/`.
- **Model feedback:** `gemini` saves outputs in `references/aI_feedback/`.
- **Image generation:** `image-generate` saves outputs in `images/`.
- **Docs + site:** You will document the process and maintain the brutalist site in `docs/`.

## Setup

1. Install dependencies:

   npm install

2. Create a `.env` file in the project root:

   OPENAI_API_KEY=your_key_here
   GEMINI_API_KEY=your_key_here

### What Is a `.env` File?

A `.env` file stores environment variables (secrets and configuration) outside your code so keys are not hard-coded into source files.

### Get Your API Keys

- OpenAI API key: https://platform.openai.com/api-keys
- Google Gemini API key (AI Studio): https://aistudio.google.com/app/apikey

## Build Path (Checklist)

- Create the CLI structure and command registry.
- Add `web-search`, then dogfood it.
- Add `gemini`, then dogfood it with an image.
- Add `image-generate`, then dogfood it.
- Document outputs and paths.

## Usage (After You Build It)

- Web search:

  npm run dev -- web-search "latest AI news"

- Gemini prompt (optional files):

  npm run dev -- gemini "Summarize this image" --file ./path/to/image.jpg

- Generate an image:

  npm run dev -- image-generate "A cinematic lighthouse in a storm" --size 1024x1024

## Output Locations

- Web search output: `references/`
- Gemini responses: `references/aI_feedback/`
- Generated images: `images/`

## Common Failure Modes

- Missing `OPENAI_API_KEY` or `GEMINI_API_KEY` in `.env`.
- Running commands before `npm install`.
- Forgetting to save outputs in `references/` or `images/`.
- Skipping dogfooding and missing errors until later.

## Capstone Task

Add a new command from scratch and prove it works:

1. Create a new command class.
2. Register it in `src/index.ts`.
3. Run it with real input.
4. Save output to an organized folder.
5. Write a short reflection on what broke and how you fixed it.

## AI Orchestration (Concepts)

AI orchestration is directing an AI system through a workflow of goals, tools, and constraints so outputs are reliable and repeatable. You are managing a workforce of experts, not just asking questions.

**Automation mindset:** Each time you catch yourself doing a repetitive task (searching, screenshotting, generating images, summarizing), design a tool and a process that removes you from the loop by turning manual steps into repeatable commands.

**Why it works:** Clarity reduces error, tool usage improves reliability, feedback loops increase quality, and organized outputs enable reuse.

## Add a New Command

Create a class in `src/commands` that implements the `Command` interface, then register it in `src/index.ts`.
