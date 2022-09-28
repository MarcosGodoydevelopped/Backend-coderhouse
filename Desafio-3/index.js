const express = require('express')
const container = require('./container')

const app = express()
const PORT = 8080

app.listen(PORT)
console.log(`Puerto abierto en ${PORT} `)
