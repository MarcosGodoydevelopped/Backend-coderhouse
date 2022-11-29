const Container = require('./container')

const productos = new Container('productos')

console.log(' EJEMPLO DE EJECUCION => UTILIZANDO setTimeout')
console.log('##  AGREGA EL PRIMER PRODUCTO: Teclado')

productos.save({
	title: 'Teclado Yamaha',
	price: 3000,
	thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_955582-MLA46557565816_062021-O.webp'
})
	.then(id => console.log(`Objeto guardado ID: ${id}`))
	.catch(err => console.log(err.message))

setTimeout(() => {
	console.log('##  AGREGA EL SEGUNDO PRODUCTO: Guitarra')
	productos.save({
		title: 'Guitarra Electrica',
		price: 300,
		thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_759352-MLA47962731957_102021-O.webp'
	}).then(id => console.log(`Objeto guardado ID: ${id}`))
		.catch(err => console.log(err.message))
}, 1000)

setTimeout(() => {
	console.log('##  SE LISTA TODOS LOS PRODUCTOS')
	productos.getAll()
		.then(data => console.log(data))
		.catch(err => console.log(err.message))
}, 2000)


setTimeout(() => {
	console.log('##  ELIMINAN TODOS LOS PRODUCTOS')
	productos.deleteAll()
		.catch(err => console.log(err.message))
}, 3000)

setTimeout(() => {
	console.log('##  SE AGREGA EL PRIMER PRODUCTO: Smart Tv')
	productos.save({
		title: 'Smart TV',
		price: 600,
		thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_924464-MLA50804451852_072022-O.webp'
	}).then(id => console.log(`Objeto guardado con ID: ${id}`))
		.catch(error => console.log(error.message))
}, 4000)

setTimeout(() => {
	console.log(' ##  AGREGA EL SEGUNDO PRODUCTO: Heladera ')
	productos.save({
		title: 'Heladera',
		price: 100,
		thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_863226-MLA48873024919_012022-O.webp'
	}).then(id => console.log(`Objeto guardado con ID: ${id}`))
		.catch(err => console.log(err.message))
}, 5000)

setTimeout(() => {
	console.log(' ##  SEGUNDO PRODUCTO SELECCIONADO: Heladera')
	productos.getByID(2)
		.then(data => console.log(data))
		.catch(err => console.log(err.message))
}, 6000)

setTimeout(() => {
	console.log(' ## ELIMINA EL SEGUNDO PRODUCTO')
	productos.deleteByID(2)
		.catch(err => console.log(err.message))
}, 7000)

setTimeout(() => {
	console.log('##  LISTA LOS PRODUCTOS ')
	productos.getAll()
		.then(data => console.log(data))
		.catch(err => console.log(err.message))
}, 8000)
