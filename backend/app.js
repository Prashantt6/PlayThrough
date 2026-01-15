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
app.use("/hls", (req, res, next) => {
  if (req.url.endsWith(".m3u8")) {
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  }
  if (req.url.endsWith(".ts")) {
    res.setHeader("Content-Type", "video/mp2t");
  }
  next();
});
app.use('/hls',express.static(path.join(__dirname, "hls")))

app.get('/', (req,res) =>{
    res.send("This is the video streaming server")
})

app.listen(PORT, () =>{
    console.log(`Server is running at port ${PORT}`)
})