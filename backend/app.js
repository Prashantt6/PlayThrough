const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req,res) =>{
    res.send("This is the video streaming server")
})

app.listen(PORT, () =>{
    console.log(`Server is running at port ${PORT}`)
})