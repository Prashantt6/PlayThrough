const startHLS =  async (videoURL) =>{
    const response = await fetch("https://localhost:3000/api.hls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: videoURL })
    });
    if(!response.ok){
        throw new Error("Failed to start streaming")
    }
    return response.json()
}