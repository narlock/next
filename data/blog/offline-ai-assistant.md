---
title: Building My Offline AI Assistant
date: 2025-05-10
---

This is an AI generated blog post. It is being used for testing markdown with Next.js

I built an offline voice-based AI assistant using Whisper.cpp for transcription, XTTS2 for voice synthesis, and Mistral 7B for local LLM interaction.

## Why offline?

Because I like owning my tools. No cloud dependency, no subscriptions.

## How it's structured

- Wake word detection: OpenWakeWord
- STT: Whisper.cpp
- LLM: Mistral 7B via Ollama
- TTS: XTTS2

```py
def main():
    print("Hello world!")
```

```js
function test() {
    console.log("Hello world!");
}
```

![testing image](/blog/offline-ai-assistant/avatar.png)
