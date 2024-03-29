import express from 'express'
import response from './server.js'
const app = express()
const port = '4000'
 
//sending redis response
app.get('/api', (req,res) => {
    res.json.send(response)
})

//app listening to port number
app.listen(port, () => {
    console.log(`App, listening on port ${port}!`)
})