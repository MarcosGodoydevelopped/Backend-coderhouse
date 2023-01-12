# Desafío 14: Loggers, gzip y análisis de performance

### **Consigna parte 1:**
---
Incorporar al proyecto de servidor de trabajo la compresión gzip.

Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un
caso y otro.


- Prueba del endpoint sin compresión: http://localhost:8080/info
- Prueba del endpoint con gzip: http://localhost:8080/info/gzip

```
const systemRouter = require('express').Router()
const os = require('os')
const compression = require('compression')

systemRouter.get('/', getSystemInformation)
systemRouter.get('/gzip', compression(), getSystemInformation)

function getSystemInformation(req, res){
  res.json({
    'Argumentos de entrada': process.argv.slice(2),
    'Nombre de la plataforma (sistema operativo)': process.platform,
    'Versión de node.js': process.version,
    'Memoria total reservada (rss)': process.memoryUsage().rss,
    'Path de ejecución':  process.argv.slice(0),
    'Proccess id': process.pid,
    'Carpeta del proyecto': process.cwd(),
    'Número de procesadores': os.cpus().length,
  })
}

module.exports = systemRouter
```

- Implementar loggueo que registre lo siguiente:
  - Ruta y método de todas las peticiones recibidas por el servidor (info)
  - Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
  - Errores lanzados por las apis de mensajes y productos, únicamente (error)

  ```
  const pino = require('pino')

  function buildDevLogger() {
    const devLogger = pino('debug.log')
    devLogger.level = 'info'
    return devLogger
  }

  let logger = buildDevLogger()

  module.exports = logger
  ```
### **Consigna parte 2:**
---
Utilize como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con
20 request por cada una.


**PRUEBAS CON ARTILLERY EN MODO FORK Y CLUSTER:**

- Al endpoint info: localhost:8080/info
- 50 conexiones concurrentes con 20 peticiones cada una.
- Reportes en los archivos: result_fork.txt y result_cluster.txt

```
node server.js -p 8080 -m FORK
artillery quick -c 50 -n 20 "http://localhost:8080/info" > result_fork.txt
```


```
node server.js -p 8080 -m CLUSTER
artillery quick -c 50 -n 20 "http://localhost:8080/info" > result_cluster.txt
```


**PRUEBAS SOBRE PROFILING:**

- Manejado en consola.
1. Ejecute el server y realizamos test con artillery

```
node --prof server.js
artillery quick -c 50 -n 20 "http://localhost:8080/info" > artillery_slow.txt
```

```
node --prof-process slow-v8.log > prof_slow.txt
```


Realize test con artillery

```
artillery quick -c 50 -n 20 "http://localhost:8080/info" > artillery_slow.txt
```



**Consigna parte 3:**

Utilize Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas
en un tiempo de 20 segundos. Extraer un reporte con los resultados

**PRUEBAS CON AUTOCANNON**
- Al endpoint http://localhost:8080/info

1. Código de test

```
const autocannon = require('autocannon')
const { PassThrough } = require('stream')

function run(url) {
  const buf = []
  const outputStream = new PassThrough()

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20
  })

  autocannon.track(inst, { outputStream })

  outputStream.on('data', data => buf.push(data))
  inst.on('done', () => {
    process.stdout.write(Buffer.concat(buf))
  })
}

console.log('Running all benchmarks in parallel ...')

run('http://localhost:8080/info')
```

