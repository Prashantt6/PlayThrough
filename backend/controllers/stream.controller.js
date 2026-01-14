const { checkStreamableUrl, getVideoStream } = require("../services/stream.service")


const validateStreamUrl = async (req, res) =>{
    try{
        const {url} = req.body

        if(!url){
            return res.status(400)  
                .json({
                    success: false,
                    message: "URL is required"
                })
        }
        const result = await checkStreamableUrl(url)

        return res.status(200)  
            .json({
                success: true,
                data: result
            })

    }catch(err){
        console.log(err)
        return res.status(400)  
            .json({
                sucess: false,
                message: err.message
            })
    }
}
const streamVideo = async(req, res) =>{
    try{
        const videoURL = req.query.url;
        const range = req.headers.range;

        if(!videoURL){
            return res.status(400)
                .json({
                    message: "Video url is required"
                })
        }
        if(!range){
            return res.status(416)
                .json({
                    message: "Range header is missing"
                })
        }
        const { stream, headers, status } = await getVideoStream(videoURL, range);

        res.writeHead(status,{
            "Content-Range": headers["content-range"],
            "Accept-Ranges": "bytes",
            "Content-Length": headers["content-length"],
            "Content-Type": headers["content-type"] || "video/mp4"
        })
        stream.pipe(res);
    }catch(error){
        res.status(500)
            .json({
                message: error.message
            })
    }
}

module.exports = {validateStreamUrl, streamVideo}