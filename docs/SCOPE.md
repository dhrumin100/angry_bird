# 📋 KAVAACH - Scope Document

## What Is Built vs. What Is Planned

---

## ✅ IMPLEMENTED IN CURRENT PROTOTYPE (MVP)

### Core Features

| # | Feature | Status | Implementation Details |
|---|---------|--------|------------------------|
| 1 | **Image Upload Interface** | ✅ Done | React drag-and-drop with preview |
| 2 | **Image Analysis** | ✅ Done | FastAPI sends to YOLOv8 model |
| 3 | **Pothole Detection Model** | ✅ Done | YOLOv8n fine-tuned (94% accuracy) |
| 4 | **Bounding Box Detection** | ✅ Done | Visual overlay on detected areas |
| 5 | **Confidence Scoring** | ✅ Done | Per-detection confidence percentage |
| 6 | **Severity Classification** | ✅ Done | Area-based (High/Medium/Low) |
| 7 | **GPS Geo-Tagging** | ✅ Done | Browser Geolocation API |
| 8 | **Reverse Geocoding** | ✅ Done | Nominatim (OpenStreetMap) |
| 9 | **Voice Input** | ✅ Done | Speech recognition for descriptions |
| 10 | **User Authentication** | ✅ Done | JWT-based login/signup |
| 11 | **Report Submission** | ✅ Done | Full CRUD with MongoDB |
| 12 | **User Dashboard** | ✅ Done | Track report status & history |
| 13 | **Admin Panel** | ✅ Done | Fleet dispatch, status management |
| 14 | **Gamification** | ✅ Done | Karma points & leaderboard |

### What You Can Demo

```
✅ Upload any road image
✅ Get instant AI-based pothole detection with bounding boxes
✅ View confidence score per detection
✅ See severity classification (HIGH/MEDIUM/LOW)
✅ Auto-capture GPS location with address
✅ Submit report with voice description
✅ Track report status in dashboard
✅ Admin can dispatch trucks and resolve issues
```

---

## 🔼 EXCEEDED ORIGINAL SCOPE

Features built that were originally "Out of Scope":

| # | Feature | Original Plan | Actual |
|---|---------|--------------|--------|
| 1 | **User Authentication** | "Not needed for prototype" | ✅ Full JWT auth implemented |
| 2 | **Full Dashboard** | "Beyond MVP scope" | ✅ Complete user & admin dashboards |
| 3 | **Object Detection** | "Classification sufficient" | ✅ YOLOv8 with bounding boxes |
| 4 | **Multi-Severity** | "Requires larger dataset" | ✅ Implemented via area ratio |
| 5 | **Admin Operations** | "Future scope" | ✅ Fleet dispatch & resolution |
| 6 | **Gamification** | Not planned | ✅ Karma points & leaderboard |

---

## ❌ INTENTIONALLY OUT OF SCOPE (Not Built - But Planned for Future)

### Not In Current Prototype

| # | Feature | Reason for Exclusion |
|---|---------|---------------------|
| 1 | **Real Bus Camera Integration** | Requires physical hardware setup |
| 2 | **Live Video Streaming** | Complex infrastructure needed |
| 3 | **Cloud Deployment** | Local demo sufficient for hackathon |
| 4 | **Mobile App (Native)** | Web PWA covers mobile use cases |
| 5 | **Traffic Optimization Engine** | Phase 4 feature |
| 6 | **Predictive Maintenance AI** | Requires historical data |
| 7 | **Integration with Municipal APIs** | Requires government partnerships |

---

## 🎯 MVP Focus Area

```
┌─────────────────────────────────────────────────────────────────┐
│                     MVP CORE FOCUS                               │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                          │   │
│   │              COMPUTER VISION + WEB APP                   │   │
│   │              POTHOLE DETECTION SYSTEM                    │   │
│   │                                                          │   │
│   │   • YOLOv8 Object Detection                             │   │
│   │   • Bounding Box Visualization                          │   │
│   │   • GPS Location Capture                                │   │
│   │   • Report Submission & Tracking                        │   │
│   │   • Admin Fleet Management                              │   │
│   │                                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   Fully Implemented: Detection + Reporting + Management         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Scope Comparison Table

| Aspect | Original MVP Plan | Actually Built |
|--------|-------------------|----------------|
| **Input** | Single image upload | ✅ Same + voice input |
| **Detection** | Binary classification | ✅ Object detection + bboxes |
| **Confidence** | Percentage score | ✅ Per-detection confidence |
| **Severity** | Basic | ✅ Area-based calculation |
| **Location** | Manual/EXIF | ✅ Auto GPS + geocoding |
| **Dashboard** | Basic UI | ✅ Full user + admin panels |
| **Database** | SQLite (local) | ✅ MongoDB Atlas (cloud) |
| **Users** | Single user demo | ✅ Multi-user with auth |
| **AI Model** | MobileNetV2 CNN | ✅ YOLOv8 object detection |
| **Backend** | Flask | ✅ Node.js + FastAPI |
| **Frontend** | Streamlit | ✅ React + Vite |

---

## 🚫 What We Explicitly Avoided (To Keep Simple)

1. **No Physical Hardware** - No cameras, sensors, or IoT devices
2. **No Video Processing** - Image-by-image analysis only
3. **No Native Mobile Apps** - Responsive web app instead
4. **No Real Government Integration** - Simulated admin workflow
5. **No Payment Systems** - Not a commercial product

---

## 🔮 Expansion Potential (Post-Hackathon)

### Phase 1: Enhanced Detection ✅ (DONE)
- [x] Multi-class: Pothole detection with bounding boxes
- [x] Severity estimation based on area
- [x] Object detection with visual overlay

### Phase 2: Mobile & IoT (Future)
- [ ] React Native mobile app
- [ ] Bus camera integration
- [ ] IoT sensor data fusion

### Phase 3: Governance Platform (Future)
- [ ] Role-based access control
- [ ] Municipal API integration
- [ ] Historical analytics & heatmaps

### Phase 4: Smart City (Future)
- [ ] Traffic optimization algorithms
- [ ] Predictive maintenance AI
- [ ] Route suggestion for drivers

---

## ✨ Summary

| Category | Status |
|----------|--------|
| **BUILT** | Full-stack web app with YOLOv8 detection, GPS, auth, dashboards |
| **EXCEEDED** | Object detection, multi-user auth, gamification, admin panel |
| **NOT BUILT** | Real-time video, mobile apps, cloud deployment |
| **FOCUS** | Computer Vision + Citizen Reporting + Admin Management |

---

<p align="center">
<b>Scope Exceeded - Hackathon Ready! ✅</b>
</p>
