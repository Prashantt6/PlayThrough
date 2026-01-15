const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// store running ffmpeg processes
const ffmpegProcesses = new Map();

const generateHLS = async (videoURL) => {
  const id = Date.now().toString();
  const outputDir = path.join(__dirname, "..", "hls", id);

  fs.mkdirSync(outputDir, { recursive: true });

  const playlistPath = path.join(outputDir, "index.m3u8");
  const firstSegmentPath = path.join(outputDir, "index0.ts");

const ffmpegArgs = [
  "-y",

  // allow progressive download
  "-re",

  // better timestamp handling
  "-fflags", "+genpts",
  "-flags", "low_delay",

  // input
  "-i", videoURL,

 // video
"-map", "0:v:0",
"-c:v", "libx264",
"-profile:v", "main",
"-level", "4.0",
"-pix_fmt", "yuv420p",

//  THIS IS THE MISSING PIECE
"-vf", "scale=iw:ih:force_original_aspect_ratio=decrease,setsar=1",

"-preset", "veryfast",
"-crf", "23",

  // audio re-encode (MANDATORY)
  "-map", "0:a:0",
  "-c:a", "aac",
  "-ac", "2",
  "-b:a", "128k",

  // HLS
  "-hls_time", "6",
  "-hls_list_size", "0",
  "-hls_flags", "independent_segments",

  "-f", "hls",
  playlistPath
];


  const ffmpeg = spawn("ffmpeg", ffmpegArgs, {
    stdio: ["ignore", "ignore", "pipe"],
  });

  // store process so we can stop it later
  ffmpegProcesses.set(id, {
    process: ffmpeg,
    lastSeen: Date.now()
  });


  ffmpeg.stderr.on("data", (chunk) => {
    console.log(`[FFmpeg ${id}]`, chunk.toString());
  });

  ffmpeg.on("error", (err) => {
    console.error("FFmpeg spawn error:", err);
  });

  // wait until playlist + first segment exist
  await new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (
        fs.existsSync(playlistPath) &&
        fs.existsSync(firstSegmentPath)
      ) {
        clearInterval(interval);
        resolve();
      }
    }, 500);

    ffmpeg.on("close", (code) => {
      clearInterval(interval);
      ffmpegProcesses.delete(id);

      if (code !== 0) {
        reject(new Error("FFmpeg exited with error"));
      }
    });
  });

  return {
    id,
    playlistUrl: `http://localhost:3000/hls/${id}/index.m3u8`,
  };
};

// stop ffmpeg when user closes tab
const stopHLS = (id) => {
  const entry = ffmpegProcesses.get(id);

  if (entry) {
    entry.process.kill("SIGKILL");
    ffmpegProcesses.delete(id);
  }

  const dir = path.join(__dirname, "..", "hls", id);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};
setInterval(() => {
  const now = Date.now();

  for (const [id, entry] of ffmpegProcesses.entries()) {
    if (now - entry.lastSeen > 2 * 60 * 1000) { 
      console.log("💀 Killing abandoned stream:", id);
      stopHLS(id);
    }
  }
}, 30 * 1000); 




module.exports = {
  generateHLS,
  stopHLS,
  ffmpegProcesses
};
