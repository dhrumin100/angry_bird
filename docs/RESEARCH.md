# 🔬 Research Notes & Technical Decisions

## 🧠 Choice of AI Model: YOLOv8
We selected **YOLOv8 (You Only Look Once)** for pothole detection due to:
1.  **Real-time Performance**: Capable of >60 FPS on standard GPUs, essential for future dashcam integration.
2.  **Accuracy/Speed Tradeoff**: The `yolov8n` (nano) and `yolov8s` (small) variants offer the best balance for edge deployment possibilities.
3.  **Community Support**: Extensive pretrained weights and documentation.

### Why not Mask R-CNN?
While Mask R-CNN provides pixel-level segmentation, it is significantly slower. For pothole detection, a bounding box is sufficient for geolocation and severity estimation (via box area ratio), as implemented in our current pipeline.

## 🗣️ AI Explanations: Groq (Llama 3 70B)
To make technical data accessible to citizens, we integrated **Groq**.
-   **Speed**: Groq's LPU (Language Processing Unit) delivers near-instant text generation.
-   **Context**: We feed the "Severity Ratio", "Confidence", and "Count" to the LLM to generate natural language summaries (e.g., *"3 severe potholes detected covering 15% of the frame"*).

## 🗺️ Geospatial Strategy
-   **Current**: MongoDB `2dsphere` index for radial queries.
-   **Future Research**: We are exploring **H3 (Uber's Hexagonal Hierarchical Spatial Index)** for better fleet dispatch optimization and heatmapping.

## 🛡️ Security & Privacy
-   **Data Sanitization**: All images are stripped of EXIF metadata (except GPS) before permanent storage (planned feature).
-   **Anonymization**: Future versions will blur license plates and faces automatically using a secondary YOLO model.
