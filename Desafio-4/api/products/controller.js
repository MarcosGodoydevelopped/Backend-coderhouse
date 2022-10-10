const productRouter = require('express').Router()
const Products = require("../../store/products")
const product = new Products()


productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProductsById)
productRouter.post('/', validateProduct, postProduct)
productRouter.put('/:id',validateProduct, putProduct)
productRouter.delete('/:id',deleteProduct)


function getAllProducts (req, res) {
    res.json(product.getAllProducts())
}

function getProductsById(req, res){
    const {id} = req.params
    const products = product.getProductById(id)
    if(!products) return res.json({error: 'Producto no encontrado' })
    res.json(products)
}

function postProduct(req, res){
    const {title, price, thumbnail }= req.body
    const newProduct = product.postProduct({ title, price, thumbnail })
    res.json(newProduct)
}

function putProduct(req,res){
    const {id}= req.params
    const{ title, price, thumbnail } = req.body
    const updateProduct = product.putProduct({ id, title, price, thumbnail })
    if(!updateProduct) return res.json({ error:" Producto no encontrado " })
    res.send(updateProduct)
}

function deleteProduct(req, res){
    const { id } = req.params
    const deleteId= product.deleteProduct(id)
    if(!deleteId) return res.json({ error: 'Producto no encontrado' })
    res.json({ id })
}

function validateProduct(req,res,next){
    const {title, price, thumbnail} = req.body

    if(!title || !price || !thumbnail || !title.trim() || !thumbnail.trim())
    return res.json({ error:"No se encontraron datos del Producto" })

    if(isNaN(price))
    return res.json({ error: "Precio: Debe ser de tipo numerico"})

    if(!thumbnail.includes('http'))
    return res.json({ error: "URL incorrecta"})

    next()
}

module.exports= productRouter
