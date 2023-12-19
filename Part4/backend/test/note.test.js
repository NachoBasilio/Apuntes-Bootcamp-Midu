const supertest = require('supertest')
const { app, server } = require('../index')
const Note = require('../models/Notes')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

const initialNotes = [
  {
    title: 'Aprendiendo fullstack',
    important: true,
    date: new Date(),
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, voluptatem ipsam consequuntur ab doloremque qui veniam ducimus quidem reprehenderit possimus necessitatibus excepturi deleniti numquam voluptas iste! Qui animi molestiae officiis.'
  },
  {
    title: 'Aprendiendo astro',
    important: true,
    date: new Date(),
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, voluptatem ipsam consequuntur ab doloremque qui veniam ducimus quidem reprehenderit possimus necessitatibus excepturi deleniti numquam voluptas iste! Qui animi molestiae officiis.'
  }
]

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  note1.save()

  const note2 = new Note(initialNotes[1])
  note2.save()
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
  const response = await api.get('/api/notes')
  const titles = response.body.map(note => note.title)
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

  const response = await api.get('/api/notes')
  const titles = response.body.map(note => note.title)
  expect(titles).toContain(newNote.title)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
