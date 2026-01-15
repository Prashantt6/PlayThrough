import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ playlistURL }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!playlistURL) return;

    const video = videoRef.current;
    const src = `http://localhost:3000${playlistURL}`;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [playlistURL]);

  return (
    <div>
      <h3>Now Playing</h3>
      <video ref={videoRef} controls width="800" />
    </div>
  );
}
