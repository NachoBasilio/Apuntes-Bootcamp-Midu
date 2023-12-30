const notesRouter = require('express').Router()
const Note = require('../models/Notes')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
  const notas = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notas)
})

notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.put('/:id', (request, response, next) => {
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

notesRouter.post('/', async (request, response, next) => {
  let { title, body, important, userId } = request.body

  if (important === 'true') {
    important = true
  } else {
    important = false
  }

  const authorization = request.get('authorization')

  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
    // Resto del código
  } catch (error) {
    return response.status(401).json({
      error: 'Token inválido o no proporcionado'
    })
  }

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token es invalido o no existe'
    })
  }

  // Vamos a recuperar al usuario
  const user = await User.findById(userId)

  const newNote = new Note({
    title: title,
    body: body,
    date: new Date(),
    important: important,
    user: user._id
  })

  // newNote.save().then(savedNote => {
  //   response.status(201).json(savedNote)
  // }).catch(err => {
  //   next(err)
  // })
  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete(':id', async (request, response, next) => {
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

module.exports = notesRouter
