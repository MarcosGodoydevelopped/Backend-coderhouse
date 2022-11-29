const productsRouter = require('express').Router()
const model = require('./model')

productsRouter.post('/', validateProduct, postProduct)

function postProduct(req,res){
    const { error } = req
    if(error && error.length > 0 ){
        return res.json({ error })
    }
    const { title, price, thumbnail } = req.body
        model
        .addProduct({ title, price, thumbnail })
        .then((productID)=> res.json({ productID }))
    }

    function validateProduct(req,res,next){
        const { title, price, thumbnail } = req.body
        if(!title || !price || !thumbnail || !title.trim() || !thumbnail.trim()){
            req.error = 'Faltan datos del PRODUCTO'
        }else if(isNaN(price)){
            req.error = 'El precio debe ser tipo numerico'
        }else if(!thumbnail.includes('http')){
            req.error = 'La URL de la imagen debe iniciar con HTTP'
        }
        req.title = title
        req.price = price
        req.thumbnail = thumbnail
        next()
    }

    module.exports = productsRouter
