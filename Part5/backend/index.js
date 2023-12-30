require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./src/controllers/users')
// const logger = require('./loggerMiddleware')

// Conexión con la base de datos
require('./mongo')

const notFound = require('./src/middleware/notFound')
const handleErrors = require('./src/middleware/handleErrors')
const notesRouter = require('./src/controllers/notes')
const loginRouter = require('./src/controllers/login')

app.use(cors())
app.use(express.json())
// Un middleware es una función que intercepta la petición que está atravesando tu API, permitiéndote realizar operaciones o aplicar lógica específica antes de que la solicitud alcance su destino final. Estas funciones juegan un papel crucial en la manipulación y el procesamiento de las solicitudes HTTP, ofreciendo un punto de intervención para personalizar el comportamiento de tu aplicación.

// app.use(logger)

// const app = http.createServer((request, response) =>{
//     response.writeHead(200,{'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/login', loginRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
})

module.exports = { app, server }
