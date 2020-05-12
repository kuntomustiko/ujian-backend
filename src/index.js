const express = require('express')
const app = express()
const port = 2020

const productRoute = require('./routes/productRoute')
const storeRouter = require('./routes/storeRouter')
const uiRoute = require('./routes/uiRoute')

app.use(express.json())
app.use(productRoute)
app.use(storeRouter)
app.use(uiRoute)

app.get('/', (req, res) => {
    res.send(`<h1>API Running at ${port} </h1>`)
})

app.listen(port, () => console.log(`API RUNNING at ${port}`)
)