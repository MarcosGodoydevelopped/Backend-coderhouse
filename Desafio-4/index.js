const express = require('express')
const productRouter = require('./api/products/controller')
const errors = require('./error')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api/products', productRouter)
app.use(express.static('public'))
app.use(errors)


app.listen(PORT, ()=>{
    console.log(`Open server on port ${PORT}`)
})
