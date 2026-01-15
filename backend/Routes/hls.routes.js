const express = require("express");
const router = express.Router();
const { generateHLS, stopHLS } = require("../services/hls.service");


router.post("/hls", async (req, res) => {
  try {
    const { url } = req.body;
    const data = await generateHLS(url);
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post(
  "/hls/:id/stop",
  express.text({ type: "*/*" }),
  (req, res) => {
    console.log("🔥 STOP HIT:", req.params.id, "time:", Date.now());
    stopHLS(req.params.id);
    res.status(200).end();
  }
);
router.post("/hls/:id/ping", (req, res) => {
  const entry = ffmpegProcesses.get(req.params.id);
  if (entry) {
    entry.lastSeen = Date.now();
  }
  res.status(200).end();
});


module.exports = router;
