# Toolkit Build Walkthrough

This walkthrough mirrors the steps used to create the CLI AI Toolkit.

## Lab Goal

Build a working CLI toolkit, then verify it by using the commands you created.

## Prerequisites

- Node.js installed (v18+ recommended).
- An editor (VS Code).
- OpenAI and Gemini API keys (see Step 2.5).

## Expected Outputs

- A working CLI with `web-search`, `gemini`, and `image-generate`.
- A `references/` folder with saved research.
- An `images/` folder with generated images.

## Step 1: Define the architecture

- Choose a command registry pattern.
- Separate commands, services, and core utilities.
- Decide on output conventions (`references/`, `images/`).

## Step 2: Scaffold the project

- Initialize Node.js + TypeScript.
- Add linting and formatting.
- Create entrypoint and registry.

## Step 2.5: Configure API keys

Create a `.env` file in the project root:

OPENAI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here

Get keys from:

- OpenAI: https://platform.openai.com/api-keys
- Google Gemini: https://aistudio.google.com/app/apikey

## Step 3: Add web search

- Create a `web-search` command.
- Use OpenAI web search tools.
- Persist outputs to `references/` with timestamped names.

## Step 4: Add Gemini integration

- Add a Gemini service with API key support.
- Implement `gemini` command for prompt + media.
- Store responses in `references/aI_feedback/`.

## Step 5: Add image generation

- Add `image-generate` command.
- Save images to `images/` with prompt-based filenames.

## Step 6: Document the system

- Update README with orchestration guidance.
- Create docs that teach the workflow.

## Step 7: Iterate with feedback

- Review outputs, adjust styles, and refine commands.

## Reflection Prompts

- Where did the tool fail on first run?
- What constraint would have prevented that failure?
- What output organization rule helped you debug faster?
