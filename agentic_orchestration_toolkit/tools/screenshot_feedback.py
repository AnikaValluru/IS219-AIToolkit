import os
import base64
import time
from pathlib import Path
import requests
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv()

OUTPUT_DIR = Path(__file__).resolve().parents[1] / "images" / "screenshots"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# env vars (set these in .env)
GEMINI_ENDPOINT = os.getenv("GEMINI_ENDPOINT")  # adapt to your Gemini API URL
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")    # or use Authorization header token

def capture_screenshot(url, outfile=None, full_page=True, wait_secs=1, viewport=None, device_scale_factor=1):
    """
    Capture a screenshot with Playwright. Waits briefly for dynamic UI to settle.
    Returns path to saved file (PNG).
    """
    timestamp = int(time.time())
    outfile = outfile or OUTPUT_DIR / f"screenshot_{timestamp}.png"
    outfile = Path(outfile)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context_kwargs = {}
        if viewport:
            context_kwargs["viewport"] = {"width": viewport[0], "height": viewport[1]}
        context = browser.new_context(**context_kwargs, device_scale_factor=device_scale_factor)
        page = context.new_page()
        page.goto(url, timeout=60000)
        # Wait for network idle and an optional fixed delay to let animations settle
        try:
            page.wait_for_load_state("networkidle", timeout=20000)
        except Exception:
            # fallback if some resources keep loading
            pass
        if wait_secs:
            time.sleep(wait_secs)
        # Optionally evaluate small JS to ensure layout is stable
        try:
            page.evaluate("() => void 0")
        except Exception:
            pass
        img_bytes = page.screenshot(full_page=full_page)
        context.close()
        browser.close()

    outfile.write_bytes(img_bytes)
    return str(outfile)

def send_image_to_gemini(image_path, instructions="Provide design feedback and actionable suggestions.", extra_payload=None):
    """
    Generic POST to Gemini-like endpoint. Most Gemini/GenAI APIs differ in exact schema;
    adapt this function to match the API you have access to.
    - Some endpoints expect multipart/form-data with a file field.
    - Others expect a JSON body with base64 image bytes and an 'instructions' field.
    """
    if not GEMINI_ENDPOINT or not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_ENDPOINT and GEMINI_API_KEY must be set in environment (.env).")

    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    # Example generic JSON payload; adapt as required by your Gemini API.
    payload = {
        "input_image_b64": b64,
        "instructions": instructions,
    }
    if extra_payload:
        payload.update(extra_payload)

    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json",
    }

    resp = requests.post(GEMINI_ENDPOINT, json=payload, headers=headers, timeout=60)
    resp.raise_for_status()
    return resp.json()

if __name__ == "__main__":
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else "https://example.com"
    out = capture_screenshot(url)
    print("Saved screenshot to:", out)
    try:
        resp = send_image_to_gemini(out)
        print("Gemini response (truncated):", str(resp)[:200])
    except Exception as e:
        print("Skipping Gemini call:", e)