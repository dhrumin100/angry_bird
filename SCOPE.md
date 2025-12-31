# 📋 KAVAACH - Scope Document

## What Is Built vs. What Is Planned

---

## ✅ IMPLEMENTED IN CURRENT PROTOTYPE (MVP)

### Core Features

| # | Feature | Status | Implementation Details |
|---|---------|--------|------------------------|
| 1 | **Image Upload Interface** | ✅ Done | Web UI for uploading road images |
| 2 | **Image Preprocessing** | ✅ Done | Resize, normalize, enhance using OpenCV |
| 3 | **Pothole Detection Model** | ✅ Done | CNN (MobileNetV2) for binary classification |
| 4 | **Confidence Scoring** | ✅ Done | Softmax output as percentage |
| 5 | **Basic Result Display** | ✅ Done | Show detection result + confidence |
| 6 | **Sample Geo-Tagging** | ✅ Done | Manual location input + EXIF extraction |
| 7 | **Demo Dashboard** | ✅ Done | Simple Streamlit/Flask UI |

### What You Can Demo

```
✅ Upload any road image
✅ Get instant AI-based pothole detection
✅ View confidence score (e.g., "94% confident")  
✅ See severity classification (HIGH/MEDIUM/LOW)
✅ Input or extract location data
✅ View detection summary
```

---

## ❌ INTENTIONALLY OUT OF SCOPE (Not Built - But Planned for Future)

### Not In Current Prototype

| # | Feature | Reason for Exclusion |
|---|---------|---------------------|
| 1 | **Real Bus Camera Integration** | Requires physical hardware setup |
| 2 | **Live GPS Tracking** | Needs mobile app development |
| 3 | **Real-Time Streaming** | Complex for demo; batch is sufficient |
| 4 | **Full Governance Dashboard** | Beyond MVP scope |
| 5 | **User Authentication** | Not needed for prototype |
| 6 | **Cloud Deployment** | Local demo sufficient for hackathon |
| 7 | **Multi-Class Severity** | Requires larger labeled dataset |
| 8 | **Object Detection (Bounding Boxes)** | Classification sufficient for MVP |
| 9 | **API Rate Limiting** | Enterprise feature |
| 10 | **Historical Data Analytics** | Future dashboard feature |
| 11 | **Maintenance Ticketing System** | Governance layer |
| 12 | **Traffic Optimization Engine** | Phase 4 feature |

---

## 🎯 MVP Focus Area

```
┌─────────────────────────────────────────────────────────────────┐
│                     MVP CORE FOCUS                               │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                          │   │
│   │              COMPUTER VISION                             │   │
│   │              POTHOLE DETECTION                           │   │
│   │                                                          │   │
│   │   • Image Input                                          │   │
│   │   • Preprocessing                                        │   │
│   │   • AI Model Inference                                   │   │
│   │   • Confidence Output                                    │   │
│   │   • Basic Geo-Tagging                                    │   │
│   │                                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   Secondary: Simple Dashboard UI for Demo                        │
│   Downstream Impact: Governance & Traffic (Explained, not built) │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Scope Comparison Table

| Aspect | MVP (Now) | Future (Planned) |
|--------|-----------|------------------|
| **Input** | Single image upload | Real-time camera feeds |
| **Detection** | Binary classification | Multi-class + bounding boxes |
| **Confidence** | Percentage score | + Severity estimation |
| **Location** | Manual/EXIF | Automatic GPS |
| **Dashboard** | Basic UI | Full governance portal |
| **Database** | SQLite (local) | PostgreSQL (cloud) |
| **Users** | Single user demo | Multi-user with auth |
| **Deployment** | Local machine | Cloud (AWS/GCP) |
| **Notifications** | None | Email/SMS alerts |
| **Analytics** | None | Charts, heatmaps, trends |

---

## 🚫 What We Explicitly Avoided (To Keep Simple)

1. **No Hardware Dependencies** - No physical cameras, sensors, or IoT devices
2. **No Complex Infrastructure** - No Kubernetes, microservices, or cloud
3. **No Real Integrations** - No municipal APIs, traffic systems
4. **No Mobile App** - Web-only for demo simplicity
5. **No Authentication** - Open demo access
6. **No Payment/Pricing** - Not a commercial product yet

---

## 🎪 Demo-Ready Limitations

### Accepted Limitations for Hackathon

| Limitation | Workaround for Demo |
|------------|---------------------|
| No live camera | Use pre-captured images |
| No automatic GPS | Manual location input available |
| Limited dataset | Model trained on public Kaggle data |
| Basic UI | Functional over beautiful |
| No cloud | Run locally on laptop |

---

## 🔮 Expansion Potential (Post-Hackathon)

### Phase 1: Enhanced Detection
- [ ] Multi-class: Pothole, Crack, Bump, Damaged Lane
- [ ] Severity estimation within each class
- [ ] Object detection with bounding boxes

### Phase 2: Mobile & IoT
- [ ] Android/iOS app for citizens
- [ ] Bus camera integration (simulated or real)
- [ ] IoT sensor data fusion

### Phase 3: Governance Platform
- [ ] Full dashboard with authentication
- [ ] Municipal user management
- [ ] Repair ticketing system
- [ ] Historical analytics

### Phase 4: Smart City
- [ ] Traffic optimization algorithms
- [ ] Predictive maintenance AI
- [ ] Integration with traffic lights
- [ ] Route suggestion for drivers

---

## ✨ Summary

| Category | What We Have |
|----------|--------------|
| **BUILT** | CV-based pothole detection, confidence scoring, basic geo-tagging, demo UI |
| **NOT BUILT** | Real-time streaming, mobile apps, full dashboard, cloud deployment |
| **FOCUS** | Computer Vision AI - Core detection pipeline |
| **IMPACT** | Governance & Traffic improvement (explained as downstream) |

---

<p align="center">
<b>Scope Clearly Defined for Hackathon Success! ✅</b>
</p>
