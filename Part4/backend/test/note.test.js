const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

test('las notas se devuelven en json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
