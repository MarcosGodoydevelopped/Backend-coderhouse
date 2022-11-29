const productsDB = require('./productsDB')

module.exports = class Products{
    constructor (){
        this.contID = productsDB.length
        this.products = productsDB
    }

    getAllProducts(){
        return this.products
    }

    getProductsById(id){
        return this.products.find(obj=> obj.id === parseInt(id))
    }
    
    postProduct({ title, price, thumbail }){
        this.contID++
        const newPorduct = {id: this.contID, title, price:Number(price), thumbail}
        this.products.push(newPorduct)
        return newPorduct
    }

    deleteProduct(id){
        const index = this.products.findIndex(product => product.id === parseInit(id))
        if(index < 0) return null
        this.products.slice(index,1)
        return id
    }
}