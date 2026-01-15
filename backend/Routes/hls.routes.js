const router = require("express").Router();
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

router.delete("/hls/:id", (req, res) => {
  stopHLS(req.params.id);
  res.json({ stopped: true });
});

module.exports = router;
