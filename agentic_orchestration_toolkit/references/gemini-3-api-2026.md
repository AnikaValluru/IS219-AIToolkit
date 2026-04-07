# Gemini 3 API Usage (2026)

This document summarizes high-level usage patterns for the Gemini 3 API in 2026, with a focus on image and video inputs. The details below are based on public updates and should be validated against the official Gemini API documentation before implementation.

## Overview

Gemini 3 adds expanded media ingestion options and larger inline upload limits, which makes it easier to send images and videos as part of requests.

## Media Upload Options (Images and Videos)

According to Google, Gemini API media inputs can be provided in several ways:

1. **Inline uploads (up to 100 MB)**
   - Send images or short video clips directly in the request body, up to a 100 MB inline limit.
   - Source: https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/

2. **Public or pre-signed URLs**
   - Provide a public URL or a pre-signed private URL (for example, S3 or Azure) for the Gemini API to fetch.
   - Source: https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/

3. **Google Cloud Storage (GCS) paths**
   - Register files directly from GCS buckets, letting the API reference the file without moving it.
   - Source: https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/

## Suggested Workflow (High Level)

- Choose the model that fits the task (text-only or multimodal).
- Provide text prompts and media inputs using one of the supported methods above.
- Validate file size, type, and model limits in the official Gemini API docs.
- Capture the response and store it in your project for audit and reuse.

## Local Storage Convention

For this toolkit, Gemini responses should be written under:

- references/aI_feedback/

This keeps Gemini outputs separate from general research notes.

## Important Notes

- Always confirm current model names, request schema, token limits, and pricing in the official Gemini API documentation.
- If you plan to upload large videos, verify any duration limits and pricing rules before production use.
