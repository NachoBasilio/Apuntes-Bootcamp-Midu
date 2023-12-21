const supertest = require('supertest')
const { app } = require('../../index')
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

const getAllTitlesFromNotes = async () => {
  const response = await api.get('/api/notes')

  return {
    titles: response.body.map(note => note.title),
    response
  }
}

module.exports = {
  initialNotes,
  api,
  getAllTitlesFromNotes
}
