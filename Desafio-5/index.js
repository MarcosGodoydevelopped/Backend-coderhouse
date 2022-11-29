import express from "express"
import  { ProductDB }  from "./store/productDB.js"

const productDB = new ProductDB()
const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views','./view')
app.set('view engine','pug')

app.get('/', viewProductList)
app.get('/crearProducto', viewCreateProduct)
app.post('/product', validateProduct, postProduct)

app.listen(PORT, () => console.log(`Open server on Port ${PORT}`))

function viewProductList(req,res){
    const products = productDB.getAllProducts()
    res.render('productList.pug',{ products })
}
function viewCreateProduct(req, res){
    const { error, title, price, thumbnail } = req.query
    return res.render('productForm.pug',{ error, title, price, thumbnail })
}
function postProduct(req,res){
    const { error } = req
    if(error && error.length > 0 ){
    return res.redirect(`/crearProducto/?error=${error}&title=${req.title}&price=${req.price}&thumbnail=${req.thumbnail}`)
    }
    const { title, price, thumbnail }= req.body
    productDB.postProduct({ title, price, thumbnail })
    return res.redirect('/')
}

function validateProduct(req,res,next){
    const { title, price, thumbnail } = req.body
    if(!title || !price || !thumbnail || !title.trim() || !thumbnail.trim()){
        req.error = "FALTAN DATOS"
    }else if(isNaN(price)){
        req.error = 'PRECIO DEBE SER TIPO NUMERICO'
    }else if(!thumbnail.includes('http')){
        req.error = 'LA URL DEBE RESPETAR EL PARAMETRO HTTP'
    }
    req.title = title
    req.price= price
    req.thumbnail= thumbnail
    next()
}