import { useState } from "react";

export default function StreamForm({ onStart }) {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");

  const submit = () => {
    if (!url) return;
    onStart(url, format);
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          placeholder="Watch any video by pasting its URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={submit}>➜</button>
      </div>

      <div className="format-buttons">
        {["mp4", "mkv", "hls"].map((f) => (
          <button
            key={f}
            className={format === f ? "active" : ""}
            onClick={() => setFormat(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </>
  );
}
