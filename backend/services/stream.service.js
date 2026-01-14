const axios = require('axios')
const { URL } = require('url')
 
const checkStreamableUrl = async (videoURL) =>{
    let parsedURL;
    
    try{
        parsedURL = new URL(videoURL)
    }catch{
        throw new Error("Invalid URL format.")
    }
    if(!["http:", "https:"].includes(parsedURL.protocol)){
        throw  new Error("Only HTTP/HTTPS URL are allowed.")
    }

    let headResponse;

    try{
        headResponse = await axios.head(videoURL, {
            timeout: 5000,
            maxRedirects: 5
        });
        
    }catch{
        throw new Error("Unable to access provided URL.")

    }

    const headers = headResponse.headers;

    const disposition = headers["content-disposition"] || ""
    if(disposition.includes(".torrent")){
        throw new Error("Torrents link are not supported");
    }

    const acceptRanges = headers["accept-ranges"];
    if(acceptRanges !== "bytes"){
        try{
            const  rangeTest = await axios.get(videoURL, {
                headers: {Range: "bytes=0-1"},
                responseType: "stream",
                timeout: 5000
            });
            if(rangeTest.status != 206){
                throw new Error()
            }
        }catch{
            throw new Error("This url  does not support HTTP range streaming")
        }
    }
    return {
        streamable: true,
        contentType: headers["content-type"],
        contentLength: headers["content-length"],
        message: "URL support  HTTP range streaming"
    }
}
const getVideoStream = async (videoURL, rangeHeader) =>{
    if(!rangeHeader){
        throw new Error ("Range header is required for streaming");
    }
    const response = await axios.get(videoURL, {
        headers: {
            Range: rangeHeader,
        },
        responseType: "stream",
        timeout: 10000,
        maxRedirects: 5
    });
    return {
        stream: response.data,
        headers: response.headers,
        status: response.status
    }
}

module.exports = {checkStreamableUrl, getVideoStream}