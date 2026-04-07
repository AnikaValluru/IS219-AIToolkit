# Image Generation Workflow

This guide walks students through generating images with OpenAI and managing outputs.

## Why This Works

Prompting is a form of specification. When you add details (subject, setting, style, lighting), the model receives clearer constraints and produces more consistent results. Iteration turns vague goals into precise outputs.

## 1. Start with a clear prompt

- Subject + setting + style + lighting.
- Example: "A cinematic lighthouse in a storm, wide angle, dramatic lighting."

## 2. Generate the image

Run the CLI command:

npm run dev -- image-generate "A cinematic lighthouse in a storm" --size 1024x1024

## 3. Review the output

Images are saved in `images/` with prompt-based filenames. Check the result and refine the prompt if needed.

## 4. Iterate intentionally

- Add clarity (camera type, mood, composition).
- Remove ambiguity (avoid vague terms like "nice" or "cool").
- Keep the prompt focused on what you want to see.

## 5. Capture learnings

Write down what changed between versions and how it affected the result. That feedback loop is the core of prompt iteration.

## Reflection Prompts

- What detail improved the output the most?
- What detail introduced confusion?
- What will you reuse in your next prompt?
