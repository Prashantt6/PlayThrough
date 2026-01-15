import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector";

export default function VideoPlayer({ playlistURL }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playlistURL) return;

    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        fluid: true,
        responsive: true,
        
      });

      playerRef.current.hlsQualitySelector({
        displayCurrentQuality: true,
      });
    }

    playerRef.current.src({
      src: playlistURL,
      type: "application/x-mpegURL",
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [playlistURL]);

  if (!playlistURL) return null;

  return (
    <div className="player-wrapper">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
}
