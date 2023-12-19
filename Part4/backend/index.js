require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./loggerMiddleware')

// Conexión con la base de datos
require('./mongo')

const Note = require('./models/Notes')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

app.use(cors())
app.use(express.json())
// Un middleware es una función que intercepta la petición que está atravesando tu API, permitiéndote realizar operaciones o aplicar lógica específica antes de que la solicitud alcance su destino final. Estas funciones juegan un papel crucial en la manipulación y el procesamiento de las solicitudes HTTP, ofreciendo un punto de intervención para personalizar el comportamiento de tu aplicación.

app.use(logger)

// const app = http.createServer((request, response) =>{
//     response.writeHead(200,{'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', async (request, response) => {
  const notas = await Note.find({})
  response.json(notas)
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const note = request.body

  const newNoteInfo = new Note({
    title: note.title,
    body: note.body,
    date: new Date(),
    important: note.important
  })

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(note => {
    if (note) {
      response.status(200).json(note)
    } else {
      response.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.delete('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id

  // Note.findByIdAndDelete(id).then(result => {
  //   response.status(204).end()
  // }).catch(err => {
  //   next(err)
  // })
  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

app.post('/api/notes', async (request, response, next) => {
  const note = request.body
  if (note.important === 'true') {
    note.important = true
  } else {
    note.important = false
  }

  const newNote = new Note({
    title: note.title,
    body: note.body,
    date: new Date(),
    important: note.important
  })

  // newNote.save().then(savedNote => {
  //   response.status(201).json(savedNote)
  // }).catch(err => {
  //   next(err)
  // })
  try {
    const savedNote = await newNote.save()
    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
})

module.exports = { app, server }
