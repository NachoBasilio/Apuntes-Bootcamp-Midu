const notesRouter = require('express').Router()
const Note = require('../models/Notes')

notesRouter.get('/', async (request, response) => {
  const notas = await Note.find({})
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

notesRouter.post('/', async (request, response, next) => {
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

module.exports = notesRouter
