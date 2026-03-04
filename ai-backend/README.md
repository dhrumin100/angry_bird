---
title: Nagar Seva AI
emoji: 🛣️
colorFrom: orange
colorTo: red
sdk: docker
app_file: main.py
pinned: false
---

# Nagar Seva AI — Pothole Detection API

Real-time pothole detection using YOLOv8n fine-tuned on road defect images, with natural language explanations powered by Groq (Llama 3.3 70B).

## API Endpoints

- `GET /` — Health check
- `POST /analyze-image` — Upload a road image for pothole detection
- `GET /docs` — Interactive API documentation (Swagger UI)

## Usage

```bash
curl -X POST "https://YOUR_SPACE_URL/analyze-image" \
  -F "image=@road_photo.jpg" \
  -F "conf_threshold=0.40"
```
