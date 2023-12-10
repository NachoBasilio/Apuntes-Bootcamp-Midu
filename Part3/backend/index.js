const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./loggerMiddleware')

// Conexión con la base de datos
require('./mongo')

const Note = require('./models/Notes')

app.use(cors())
app.use(express.json())
// Un middleware es una función que intercepta la petición que está atravesando tu API, permitiéndote realizar operaciones o aplicar lógica específica antes de que la solicitud alcance su destino final. Estas funciones juegan un papel crucial en la manipulación y el procesamiento de las solicitudes HTTP, ofreciendo un punto de intervención para personalizar el comportamiento de tu aplicación.

app.use(logger)

let notes = []

// const app = http.createServer((request, response) =>{
//     response.writeHead(200,{'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id

  const note = notes.find(note => note.id === parseInt(id))

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== parseInt(id))

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (note.important === 'true') {
    note.important = true
  } else {
    note.important = false
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  // Lo del length no es la mejor opción
  const newNote = {
    id: maxId + 1,
    date: new Date().toISOString(),
    title: note.title,
    body: note.body,
    important: note.important
  }

  notes = [...notes, newNote]

  response.status(201).json(notes)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
})
