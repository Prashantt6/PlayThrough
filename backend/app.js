const express = require('express')
const axios = require('axios')
const cors = require('cors')
const path = require('path')

const streamRouter = require('./Routes/stream.routes')
const hlsRouter = require('./Routes/hls.routes')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);  

// Routes
app.use('/api',streamRouter)
app.use('/api', hlsRouter)

app.use("/hls", express.static("hls", {
  setHeaders(res, path) {
    if (path.endsWith(".m3u8")) {
      res.set("Content-Type", "application/vnd.apple.mpegurl");
    }
    if (path.endsWith(".ts")) {
      res.set("Content-Type", "video/mp2t");
    }
    res.set("Access-Control-Allow-Origin", "*");
  }
}));



app.get('/', (req,res) =>{
    res.send("This is the video streaming server")
})

app.listen(PORT, () =>{
    console.log(`Server is running at port ${PORT}`)
})