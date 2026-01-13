const { checkStreamableUrl } = require("../services/stream.service")


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

module.exports = validateStreamUrl