# PlayThrough 🎬

PlayThrough is a web-based video streaming application that allows users to **paste a video URL and instantly watch it in the browser**.  
The backend dynamically processes videos using **FFmpeg** and serves them as **HLS streams**, while the frontend provides a modern, responsive video player powered by **Video.js**.

---

## 🚀 Features

- 🔗 Play videos directly from remote URLs  
- 🔄 On-the-fly transcoding using FFmpeg  
- 📺 HLS (HTTP Live Streaming) support  
- 🎚 Quality selector for supported streams  
- 🖥 Responsive UI with fullscreen support  
- 🎥 Supports large video files (MP4 / MKV → HLS)  
- ⚡ Automatic cleanup of streams when stopped  

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Video.js
- videojs-hls-quality-selector
- Modern CSS (Glassmorphism-style UI)

### Backend
- Node.js
- Express
- FFmpeg
- HLS (.m3u8 + .ts segments)

---

## 📂 Project Structure

```text
Play_Through/
├── backend/
│   ├── routes/
│   │   └── hls.routes.js
│   ├── services/
│   │   └── hls.service.js
│   ├── hls/                # Generated HLS streams
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StreamForm.jsx
│   │   │   └── VideoPlayer.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.css
│   │   └── index.css
│   └── vite.config.js
│
└── README.md
```
---

## ⚙️ How It Works
```text
1. User pastes a video URL in the frontend

2. Frontend sends the URL to the backend

3. Backend uses FFmpeg to:

    Download the video

    Transcode it to H.264 + AAC

    Convert it into HLS segments

4. Backend serves the HLS playlist

5. Frontend plays the stream using Video.js
```
---

## ▶️ Running the Project

# Prerequisites
```text
    Node.js (v18+ recommended)

    FFmpeg installed and available in PATH
```
# Backend
```bash
cd backend
npm install
npm run dev
```
Backend run on 
```bash
http://localhost:3000
```

# Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```bash
http://localhost:5173
```

---
## Important Notes
```text
Not all video URLs are playable
(some hosts block FFmpeg, require cookies, or use DRM)

Large HEVC (H.265) files may take time to start streaming

This project is for educational and experimental purposes

Do not use it to stream copyrighted content without permission
```
