const User = require('../src/models/User')
const bcrypt = require('bcrypt')
const { api } = require('../src/helpers/helpers')
const { server } = require('../index')
const { default: mongoose } = require('mongoose')

describe.only('creando un nuevo usuario', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'miduroot', passwordHash })

    await user.save()
  })

  test('Usuario nuevo', async () => {
    const usersDB = await User.find({})

    const usersAtStart = usersDB.map(user => user.toJSON())

    const newPasswordHash = await bcrypt.hash('pswd', 10)
    const newUser = new User({
      username: 'miduroot',
      name: 'Diego',
      newPasswordHash
    })

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersDBAfter = await User.find({})
    const usersAtEnd = usersDBAfter.map(user => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
