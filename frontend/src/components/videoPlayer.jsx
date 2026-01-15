export default function VideoPlayer({playlistURL}) {
    console.log("Playlist link:", playlistURL)
    if(!playlistURL){
        return null
    }

    return(
        <div>
            <h3>Now playing</h3>

            <video
                controls
                width= "800"
                src= {`http://localhost:3000${playlistURL}`}
            />
        </div>
    )
    
}