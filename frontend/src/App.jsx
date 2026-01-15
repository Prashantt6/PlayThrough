import { useState } from "react";
import StreamForm from "./components/StreamForm";
import VideoPlayer from "./components/VideoPlayer";
import { startHLS, stopHLS } from "./services/api";
import { useEffect } from "react";

function App() {
  const [playlistURL, setPlaylistURL] = useState(null)
  const [streamId, setStreamId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleStart = async(url) =>{
    
    try{
      setLoading(true)
      setPlaylistURL(null)
      
      const data = await startHLS(url);
      setPlaylistURL(data.playlistUrl)
      setStreamId(data.streamId)
    }catch(err){
      alert("Failed to start streaming")
    }finally{
      setLoading(false)
    }

  }
useEffect(() => {
  if (!streamId) return;

    const interval = setInterval(() => {
      fetch(`http://localhost:3000/api/hls/${streamId}/ping`, {
        method: "POST",
        keepalive: true
      }).catch(() => {});
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [streamId]);





  return (
    <div className="container">
      <div className="card">
        <div className="title">PlayThrough</div>
        <StreamForm onStart={handleStart} />
        {loading && <div className="status">Preparing to stream....</div>}
        
        <VideoPlayer playlistURL={playlistURL} />
      </div>
    </div>
  )
}


export default App;