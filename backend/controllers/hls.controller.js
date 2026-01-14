const { generateHLS } = require("../services/hls.service")

const startHLS = async (req, res) =>{
    try{
        const {url} = req.body
        
        if(!url) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Invalid URL"
                })
        }

        const { id } = await generateHLS(url)

        return res.status(200)
            .json({
                success: true,
                playlistUrl: `/hls/${id}/index.m3u8`
            })
    }catch(error){
        console.error("HLS Controller Error:", error)

        return res.status(500)
            .json({
                success: false,
                message: error.message || "Failed to generate HLS stream"
            })

    }
}
module.exports = {startHLS}