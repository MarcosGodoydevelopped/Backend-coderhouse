const fs = require('fs')

module.exports = class Container {

    constructor(nombreArchivo){
        this.rutaArchivo = `./${nombreArchivo}.txt`
        this.contID = 1
    }

    async save(obj){
        try{
            let text = ''
            if(!fs.existsSync(this.rutaArchivo)){
                obj.id=this.contID
                text=JSON.stringify([obj])
            }else{
                const content = await this.getAll()
                if(content.length > 0 ){
                    this.contID = content[content.length - 1].id + 1
                }else{
                    this.contID = 1
                }
                obj.id = this.contID
                text = JSON.stringify([...content, obj])
            }
                await fs.promises.writeFile(this.rutaArchivo, text)
                return obj.id
            }catch(err){
                throw new Error(`Error al escribir el Objeto : ${JSON.stringify(obj)} en el Archivo ${this.rutaArchivo} info ${err.message}`)
        }
    }

    async getByID(id){

        try{
            const content = await this.getAll()
            if(content.length > 0){
                const obj = content.find( obj => obj.id === id)
                if(obj) return obj
            }
            throw new Error(`Objeto ${id} no encontrado  en el Archivo : ${this.rutaArchivo} info: ${null}`)
            }
                catch(err){
                throw new Error(`Error al obtener el objeto con ID: ${id} el Archivo: ${this.rutaArchivo} info: ${err.message}`)
            }
        }

    async getAll(){
        try{
            if(!fs.existsSync(this.rutaArchivo)) throw new Error(`Archivo: ${this.rutaArchivo} no encontrado`)
            const content = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            if(!content.length > 0 ){
                await fs.promises.writeFile(this.rutaArchivo, '[]')
            }else {
                const array = JSON.parse(content)
                return array
            }
            return []
        }catch(err){
            throw new Error(`Error al leer el Archivo:${this.rutaArchivo} info: ${err.message}`)
        }
    }
    async deleteByID(id){
        try{
            if(!fs.existsSync(this.rutaArchivo)){
                throw new Error(`No se puede eliminar el objeto con ID: ${id} del Archivo: ${this.rutaArchivo} no existe`)
            }else{
                const content = await this.getAll()
                if(content.length > 0 ){
                    const index = content.findIndex(obj => obj.id === id)
                    if(index === -1){
                        throw new Error(`No se puede eliminar el objeto con el ID: ${id}  no existe el Archivo: ${this.rutaArchivo}`)
                    }else{
                        content.splice(index, 1)
                        const text= JSON.stringify(content)
                        await fs.promises.writeFile(this.rutaArchivo, text)
                    }
                }
            }
        }catch(err){
            throw new Error(`Error al eliminar el objeto con el ID: ${id} del archivo:${this.rutaArchivo} info:${err.message}`)
        }
    }
    async deleteAll(){
        try{
            if(!fs.existsSync(this.rutaArchivo)){
                throw new Error(`No se puede limpiar el Archivo: ${this.rutaArchivo} no existe`)
            }else{
                await fs.promises.writeFile(this.rutaArchivo,'')
                console.log(`Archivo ${this.rutaArchivo} limpio`)
            }
        }catch(err){
            throw new Error(`Error al limpiar Archivo: ${this.rutaArchivo} info ${err.message}`)
        }
    }
}