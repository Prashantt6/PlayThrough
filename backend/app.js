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

// Routes
app.use('/api',streamRouter)
app.use('/api', hlsRouter)

app.use('/hls',express.static(path.join(__dirname, "hls")))

app.get('/', (req,res) =>{
    res.send("This is the video streaming server")
})

app.listen(PORT, () =>{
    console.log(`Server is running at port ${PORT}`)
})