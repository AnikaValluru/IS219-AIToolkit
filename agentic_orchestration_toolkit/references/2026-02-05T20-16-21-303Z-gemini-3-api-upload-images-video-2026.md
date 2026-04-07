# Web Search

**Query:** Gemini 3 API upload images video 2026

As of February 2026, the Gemini 3 API offers enhanced capabilities for uploading and processing images and videos, facilitating more efficient integration into your applications.

**Key Updates:**

- **Increased File Size Limits:** The inline file size limit has been increased from 20 MB to 100 MB, allowing for larger images, short video clips, and audio files to be processed directly without pre-uploading. ([blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/?utm_source=openai))

- **Expanded Input Support:** You can now provide public URLs or pre-signed private URLs (e.g., from AWS S3 or Azure) directly to the Gemini API, eliminating the need to download files to your backend before sending them to the API. ([blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/?utm_source=openai))

- **Google Cloud Storage Integration:** Users can register files directly from Google Cloud Storage (GCS) buckets, streamlining the process of bringing data into the Gemini API. ([blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/?utm_source=openai))

**Uploading Images and Videos via the Gemini 3 API:**

1. **Inline File Uploads:** For files up to 100 MB, you can include them directly in your API request. This method is suitable for rapid prototyping and real-time applications. ([blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/?utm_source=openai))

2. **External URLs:** Provide public or pre-signed URLs to your media files. The Gemini API will fetch the files directly from these URLs, reducing the need for additional data transfers. ([blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/?utm_source=openai))

3. **Google Cloud Storage (GCS):** If your media files are stored in GCS, you can register them directly with the Gemini API by specifying the GCS path, allowing the API to reference your storage location without moving the actual files. ([blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-new-file-limits/?utm_source=openai))

**Considerations:**

- **Token Limits:** The Gemini 3 Pro API model supports up to approximately 1 million input tokens and up to 64,000 output tokens. Ensure that your media files, including images and videos, fit within this combined token window. ([glbgpt.com](https://www.glbgpt.com/hub/gemini-3-pro-token-limit/?utm_source=openai))

- **Pricing:** Processing video content incurs costs. For instance, processing a 1-hour video at $0.002 per second would cost approximately $7.20. ([thinkpeak.ai](https://thinkpeak.ai/google-gemini-3-api-pricing-2026-guide/?utm_source=openai))

By leveraging these enhanced capabilities, you can more effectively integrate image and video processing into your applications using the Gemini 3 API.
