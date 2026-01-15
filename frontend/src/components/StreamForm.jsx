import { useState } from "react";

export default function StreamForm({ onStart }){
    const [url, setUrl] = useState("")
    const[type, setType] = useState("mp4")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!url) return ;
        onStart(url, type)
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px"}}>
            <h3>Stream your Video</h3>

            <select value= {type} onChange={(e) => setType(e.target.value)}>
                <option value= "mp4">MP4 (easy)</option>
                <option value = "other">Other formats(MKV, AVI, etc.)</option>
            </select>

            <br /> <br />

            <input 
                type= "text"
                placeholder="Paste video URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{width: "400px"}}
            />
            <br /> <br /> 
            <button type = "submit">Start Streaming</button>
        </form>
    )
}