const axios = require('axios')
const { spawn } = require("child_process");
const fs = require('fs')
const path = require('path')

const generateHLS = async (videoURL) =>{
    const id = Date.now().toString()
    const outputDir = path.join(__dirname, "..", "hls", id)

    fs.mkdirSync(outputDir, {recursive: true})

    const playlistPath = path.join(outputDir, "index.m3u8")

    const response = await axios.get(videoURL,{
        responseType: "stream",
        timeout: 5000
    })

    const ffmpegArgs = [
        "-i", "pipe:0",

        "-map", "0:v:0",
        "-map", "0:a:0",

        "-c:v", "libx264",
        "-c:a", "aac",

        "-preset", "veryfast",
        "-crf", "23",

        "-hls_time", "6",
        "-hls_list_size", "0",
        "-hls_flags", "independent_segments",

        "-f", "hls",
        playlistPath
    ]
    const ffmpeg = spawn("ffmpeg", ffmpegArgs)

    response.data.pipe(ffmpeg.stdin)

    ffmpeg.stderr.on("data", (chunk) =>{
        console.log("[FFmpeg]", chunk.toString())
    })

    ffmpeg.on("error", (err) =>{
        console.log("FFmpeg spawn error", err)
    })

    await new Promise((resolve, reject) =>{
        const check = setInterval(()=>{
            if(fs.existsSync(playlistPath)){
                clearInterval(check)
                resolve()
            }
        },500)
        ffmpeg.on("close", (code) =>{
            if(code !=0){
                reject(new Error("FFmpeg exited with error"))
            }
        } )
    })
    return {
        id,
        playlistPath
    }
}

module.exports = {generateHLS}