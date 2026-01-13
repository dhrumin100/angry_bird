# 🛡️ KAVAACH - AI-Powered Road Safety & Pothole Detection System

> *"Kavach" (कवच) means "Shield" in Hindi - Shielding citizens and cities from road hazards*

[![Hackathon](https://img.shields.io/badge/Angry%20Bird-Hackathon-red)](/)
[![Domain](https://img.shields.io/badge/Domain-AI%2FML-blue)](/)
[![Status](https://img.shields.io/badge/Status-MVP%20Prototype-green)](/)

---

## 👥 Team - The Slingshot

| Member | Role | GitHub |
|--------|------|--------|
| **Dhrumin** (dhrumin100) | **Team Lead** AI & Mobile Lead | [@dhrumin100](https://github.com/dhrumin100) |
| **Bhavya** (bhavyakela07) | AI & Database | [@bhavyakela07](https://github.com/bhavyakela07) |
| **Meet** (meetvasini2810) | Frontend & Design | [@meetvasini2810](https://github.com/meetvasini2810) |
| **Krishna** (krishna-9016) | Backend  | [@krishna-9016](https://github.com/krishna-9016) |

---
*Submitted for The Slingshot Hackathon*

> 📚 **[View Detailed System Documentation](./docs/SYSTEM_DESIGN.md)** | **[Research Notes](./docs/RESEARCH.md)**

---

## 📋 Table of Contents
- [Idea Summary](#-idea-summary)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Data Flow (DFD)](#-data-flow-dfd)
- [Technical Flow - Computer Vision Pipeline](#-technical-flow---computer-vision-pipeline)
- [Current Scope (MVP)](#-current-scope-mvp)
- [Future Roadmap](#-future-roadmap)

---

## 💡 Idea Summary

**KAVAACH** is an AI-powered road condition monitoring system that uses **computer vision** to detect potholes and road damage from images. Detected issues are **geo-tagged** and sent to a **centralized governance dashboard**, enabling municipal authorities to prioritize and plan road maintenance effectively.

### What We Are Building
A smart, data-driven solution that:
1. **Detects** potholes and road damage using AI/ML
2. **Geo-tags** issues with location data
3. **Reports** to a governance dashboard for action
4. **Enables** future traffic optimization

### Why We Are Building This
- Indian cities lose **₹1.5 lakh crores annually** due to traffic congestion
- **Poor road conditions** (potholes, cracks) cause 30% of urban traffic slowdowns
- Municipal bodies **lack real-time data** for proactive maintenance
- Current complaint systems are **reactive, not predictive**

---

## 🚨 Problem Statement

### The Reality of Indian Roads
```
📍 3,500+ deaths annually due to potholes (NCRB Data)
📍 Average commuter loses 1.5 hours daily to traffic
📍 No structured, real-time road condition data exists
📍 Municipal repairs are reactive, not preventive
```

### Core Challenges
| Challenge | Impact |
|-----------|--------|
| **No Real-Time Data** | Authorities unaware of road conditions |
| **Reactive Maintenance** | Repairs happen after accidents/complaints |
| **Traffic Congestion** | Vehicles slow down around damaged roads |
| **Safety Hazards** | Potholes cause accidents and vehicle damage |

---

## ✅ Our Solution

### KAVAACH - A Three-Layer Approach

```
┌─────────────────────────────────────────────────────────────┐
│                     LAYER 1: DETECTION                       │
│   Computer Vision AI detects potholes from images            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     LAYER 2: REPORTING                       │
│   Geo-tagged data sent to centralized dashboard              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     LAYER 3: ACTION                          │
│   Municipal authorities prioritize & schedule repairs        │
└─────────────────────────────────────────────────────────────┘
```

### Key Features
- 🔍 **AI Pothole Detection** - CNN-based image analysis
- 📍 **Geo-Tagging** - Location mapping of detected issues
- 📊 **Governance Dashboard** - Visual overview for authorities
- ⚡ **Real-Time Alerts** - Priority-based notifications
- 📱 **Multi-Source Input** - Bus cameras, citizen uploads

## 📂 Repository Structure

-   [**angry-bird/**](./angry-bird/): **Frontend (React)** (Vite PWA)
-   [**backend/**](./backend/): **Backend API (Node.js/Express)**
    -   `server.js`: Entry point
    -   `routes/`: API Endpoints
-   [**ai-backend/**](./ai-backend/): **AI Service (Python/FastAPI)**
    -   `main.py`: YOLOv8 Inference Engine
    -   `models/`: Checkpoints

---

## ⚙️ How It Works

### Step-by-Step Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   CAPTURE    │───▶│   PROCESS    │───▶│   DETECT     │
│  Road Image  │    │  Preprocess  │    │   Pothole    │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
                                               ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   ACTION     │◀───│   REPORT     │◀───│   GEO-TAG    │
│  Repair Plan │    │  Dashboard   │    │   Location   │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Detailed Steps

| Step | Action | Description |
|------|--------|-------------|
| 1️⃣ | **Image Capture** | Road images captured via bus cameras or citizen app |
| 2️⃣ | **Preprocessing** | Image resized, normalized, enhanced for model input |
| 3️⃣ | **AI Detection** | CNN model classifies image (pothole/no pothole) |
| 4️⃣ | **Confidence Score** | Model outputs detection confidence (0-100%) |
| 5️⃣ | **Geo-Tagging** | GPS coordinates attached to detection |
| 6️⃣ | **Dashboard Update** | Results pushed to governance portal |
| 7️⃣ | **Prioritization** | Issues ranked by severity and location |
| 8️⃣ | **Action Trigger** | Maintenance teams notified for repair |

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **AI/ML Model** | Python, TensorFlow/PyTorch | Pothole detection |
| **Image Processing** | OpenCV, PIL | Preprocessing pipeline |
| **Backend** | Flask/FastAPI | API endpoints |
| **Frontend** | HTML/CSS/JS (or Streamlit) | Dashboard UI |
| **Database** | SQLite/PostgreSQL | Store detections |
| **Geo-Tagging** | Geopy, Google Maps API | Location services |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        INPUT SOURCES                             │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  Bus Cameras    │  Citizen App    │  Traffic Cameras (Future)   │
└────────┬────────┴────────┬────────┴─────────────┬───────────────┘
         │                 │                      │
         └─────────────────┼──────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    KAVAACH CORE ENGINE                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Preprocessor│──│ AI Model    │──│ Geo-Tagger              │  │
│  │  (OpenCV)   │  │ (CNN)       │  │ (GPS/Maps)              │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GOVERNANCE DASHBOARD                          │
├─────────────────────────────────────────────────────────────────┤
│  📊 Detection Map  │  📈 Analytics  │  🔔 Alerts  │  📋 Reports │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow (DFD)

### Level 0 - Context Diagram
```
┌──────────────┐         ┌─────────────────┐         ┌──────────────┐
│              │  Image  │                 │ Reports │              │
│   Citizens   │────────▶│    KAVAACH      │────────▶│  Municipal   │
│   / Buses    │         │    SYSTEM       │         │  Authority   │
│              │◀────────│                 │◀────────│              │
└──────────────┘  Status └─────────────────┘ Actions └──────────────┘
```

### Level 1 - Detailed DFD
```
┌─────────────┐
│ Image Input │
└──────┬──────┘
       │ Raw Image + GPS
       ▼
┌─────────────────────┐
│ P1: Preprocess      │───▶ [D1: Processed Images]
│     Image           │
└──────────┬──────────┘
           │ Normalized Image
           ▼
┌─────────────────────┐
│ P2: Detect Pothole  │───▶ [D2: Detection Results]
│     (AI Model)      │
└──────────┬──────────┘
           │ Detection + Confidence
           ▼
┌─────────────────────┐
│ P3: Geo-Tag &       │───▶ [D3: Tagged Reports]
│     Store           │
└──────────┬──────────┘
           │ Complete Report
           ▼
┌─────────────────────┐
│ P4: Update          │───▶ [Dashboard Display]
│     Dashboard       │
└─────────────────────┘
```

---

## 🔬 Technical Flow - Computer Vision Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    IMAGE INPUT                                   │
│  Source: Camera/Upload  │  Format: JPG/PNG  │  Size: Variable   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PREPROCESSING                                 │
│  1. Resize to 224x224    2. RGB Conversion    3. Normalize 0-1  │
│  4. Contrast Enhancement (CLAHE)    5. Noise Reduction          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POTHOLE DETECTION MODEL                       │
│  Architecture: YOLOv8 (Ultralytics)                             │
│  Input: (640, 640, 3) → Backbone → Neck → Head                  │
│  Output: Object Detection [BBox, Class, Confidence]             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OUTPUT & CONFIDENCE                           │
│  Result: "POTHOLE DETECTED" / "ROAD OK"                         │
│  Confidence: 0.00 - 1.00    │    Threshold: >= 0.70             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GEO-TAGGING                                   │
│  Lat/Long extraction  │  Timestamp  │  Reverse Geocoding        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD UPDATE                              │
│  API: POST /api/report  │  DB Insert  │  Map Pin Update         │
└─────────────────────────────────────────────────────────────────┘
```

### Sample Output
```json
{
  "report_id": "KV-2024-00142",
  "detection": "POTHOLE",
  "confidence": 0.94,
  "severity": "HIGH",
  "location": { "lat": 28.6139, "lng": 77.2090, "address": "Connaught Place, New Delhi" },
  "timestamp": "2024-01-15T10:30:00Z",
  "status": "PENDING_VERIFICATION"
}
```

---

## 📦 Current Scope (MVP)

### ✅ Implemented
| Feature | Description |
|---------|-------------|
| Image Upload | Upload road images for analysis |
| Preprocessing | Resize, normalize, enhance images |
| **Object Detection** | **YOLOv8** bounding box detection |
| **Severity Analysis** | Low/Med/High based on defect area |
| Confidence Score | Output detection probability |
| Basic UI | Simple interface for demo |
| **AI Explanation** | **Groq/LLM** generated insights |

### ❌ Out of Scope (For Now)
| Feature | Reason |
|---------|--------|
| Real bus camera integration | Requires hardware |
| Live GPS tracking | Needs mobile app |
| Full governance dashboard | Beyond MVP |
| Multi-class severity | Requires larger dataset |
| Cloud deployment | Local demo sufficient |

---

## 🚀 Future Roadmap

### Phase 1: Enhanced Detection (Month 1-2)
- Multi-class classification (pothole, crack, bump)
- Severity estimation (low/medium/high)
- Object detection with bounding boxes

### Phase 2: Mobile Integration (Month 3-4)
- Android/iOS citizen app
- Real-time camera capture
- Automatic GPS tagging

### Phase 3: Governance Dashboard (Month 5-6)
- Full web dashboard with analytics
- Interactive map visualization
- Maintenance ticket system

### Phase 4: Smart City Integration (Month 7+)
- Bus fleet camera integration
- Traffic optimization engine
- Integration with municipal systems

---

## 🔄 System Flow Summary

```
    📷 CAPTURE          🔍 PROCESS          📊 REPORT
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐       ┌───────────┐       ┌──────────┐
   │ Camera/ │──────▶│ AI Model  │──────▶│ Dashboard│
   │ Upload  │       │ Detection │       │ Display  │
   └─────────┘       └───────────┘       └──────────┘
        │                   │                   │
   ┌─────────┐       ┌───────────┐       ┌──────────┐
   │  GPS    │──────▶│Confidence │──────▶│ Database │
   │  Data   │       │  Score    │       │ Storage  │
   └─────────┘       └───────────┘       └──────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  GEO-TAGGED   │
                    │    REPORT     │
                    └───────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
    ┌───────────────┐               ┌───────────────┐
    │ 🔧 MAINTENANCE │               │ 🚦 TRAFFIC     │
    │   (Current)   │               │   (Future)    │
    └───────────────┘               └───────────────┘
```

---

<p align="center">
  <b>🛡️ KAVAACH - Building Safer Roads, One Pothole at a Time 🛡️</b>
</p>

---

