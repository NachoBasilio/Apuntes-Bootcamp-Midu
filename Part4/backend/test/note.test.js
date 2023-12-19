const { server } = require('../index')
const Note = require('../models/Notes')
const { default: mongoose } = require('mongoose')
const { initialNotes, api, getAllTitlesFromNotes } = require('./helpers/helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

test('las notas se devuelven en json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('tiene que comenzar con dos notas', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

// test('La primer nota tiene que hablar sobre fullstack', async () => {
//   const response = await api.get('/api/notes')
//   expect(response.body[0].title).toBe('Aprendiendo fullstack')
// })

test('La en alguna nota tiene que hablar sobre astro', async () => {
  const { titles } = await getAllTitlesFromNotes()
  expect(titles).toContain('Aprendiendo astro')
})

test('se valide el agregar una nueva nota', async () => {
  const newNote = {
    title: 'Aprendiendo astro',
    important: true,
    date: new Date(),
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, voluptatem ipsam consequuntur ab doloremque qui veniam ducimus quidem reprehenderit possimus necessitatibus excepturi deleniti numquam voluptas iste! Qui animi molestiae officiis.'
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { titles } = await getAllTitlesFromNotes()
  expect(titles).toContain(newNote.title)
})

test('a note can be delete', async () => {
  const { response: primerResponse } = await getAllTitlesFromNotes()
  const { body: notes } = primerResponse
  const [noteToDelete] = notes
  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const { response } = await getAllTitlesFromNotes()
  expect(response.body).toHaveLength(initialNotes.length - 1)
})

test('a note that do not exist can not be delete', async () => {
  await api
    .delete('/api/notes/3232')
    .expect(400)

  const { response } = await getAllTitlesFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
