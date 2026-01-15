import { useState } from "react";

function App() {
  const [videoUrl, setVideoUrl] = useState("")
  const [playlistURL, setPlaylistURL] = useState(null)
  const [loading, setLoading] = useState(false)

  const startStreaming = async() =>{
    setLoading(true)
    setPlaylistURL(null)
    try{
      const res = await fetch("https://localhost:3000/api/hls", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({url: videoUrl})

      })
      const data = await res.json();
      setPlaylistURL(data.playlistURL)
    }catch(err){
      alert("Failed to start streaming")
    }finally{
      setLoading(false)
    }

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

      <br /> <br />
        {loading && <p>Preparing stream....</p>}

        {playlistURL && (
          <video 
            controls
            width= "800"
            src={`http://localhost:3000${playlistURL}`}
            />
        )}
    </div>
  )
}

export default App;