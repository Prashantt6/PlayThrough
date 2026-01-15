import { useState } from "react";

function App() {
  const [videoUrl, setVideoUrl] = useState("")

  const startStreaming = () =>{
    console.log("User wants to stream:", videoUrl)
  }

  return (
    <div style={{ padding: "20px"}}>
      <h2>PlayThrough</h2>

      <input
        type= "text"
        placeholder="Paste video URL"
        value = {videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style = {{width: "400px"}}
      />

      <br /><br />

      <button onClick={startStreaming}>
        Start Streaming
      </button>
    </div>
  )
}

export default App;