require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const usersRouter = require('./src/controllers/users')
const notesRouter = require('./src/controllers/notes')
const loginRouter = require('./src/controllers/login')

require('./mongo')

const notFound = require('./src/middleware/notFound')
const handleErrors = require('./src/middleware/handleErrors')

// Servidor

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
})

module.exports = { app, server }
