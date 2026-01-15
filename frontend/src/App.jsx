import { useState } from "react";
import StreamForm from "./components/StreamForm";
import VideoPlayer from "./components/VideoPlayer";
import { startHLS } from "./services/api";


function App() {
  const [playlistURL, setPlaylistURL] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleStart = async(url) =>{
    
    try{
      setLoading(true)
      setPlaylistURL(null)
      
      const data = await startHLS(url);
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

      <StreamForm onStart={handleStart} />
      {loading && <p>Preparing stream....</p>}

      <VideoPlayer playlistURL={playlistURL} />
    </div>
  )
}

export default App;