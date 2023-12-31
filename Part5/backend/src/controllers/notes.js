const notesRouter = require('express').Router()
const Note = require('../models/Notes')
const User = require('../models/User')
const userExtractor = require('../middleware/UserExtractor')

notesRouter.get('/', async (request, response) => {
  const notas = await Note.find({}).populate({
    path: 'user',
    select: 'username name'
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

notesRouter.put('/:id', userExtractor, (request, response, next) => {
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

notesRouter.post('/', userExtractor, async (request, response, next) => {
  let { title, body, important } = request.body
  const { userId } = request
  if (important === 'true') {
    important = true
  } else {
    important = false
  }

  const user = await User.findById(userId)

  if (!user) {
    return response.status(404).json({ error: 'Usuario no encontrado' })
  }

  const newNote = new Note({
    title: title,
    body: body,
    date: new Date(),
    important: important,
    user: user._id.toString()
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

notesRouter.delete(':id', userExtractor, async (request, response, next) => {
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
