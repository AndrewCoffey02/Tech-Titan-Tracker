import express from 'express'
import response from './server.js'
const app = express()
const port = '4000'

 

app.get('/api', (req,res) => {
    res.send(response);
})


app.listen(port, () => {
    console.log(`App, listening on port ${port}!`)
})