const supertest = require('supertest')
const { app, server } = require('../index')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

test('las notas se devuelven en json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
