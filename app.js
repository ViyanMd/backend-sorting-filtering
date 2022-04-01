require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/connect')
const express = require('express')
const app = express()

const products = require('./routes/products')
const notFoundMid = require('./middleware/notfound')
const errorHandlerMid = require('./middleware/errorhandler')

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h1>Store API<h1><a href="api/v2/products">Get all products</a>')
})

app.use('/api/v2/products', products)
app.use(notFoundMid)
app.use(errorHandlerMid)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI, console.log(`Database connected!`))
        app.listen(port, console.log(`The server is running on port ${port}`))
    } catch(error) {
        console.log(error)
    }
}

start()