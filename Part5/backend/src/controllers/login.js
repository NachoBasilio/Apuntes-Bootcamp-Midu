const bcrypt = require('bcrypt')
const User = require('../models/User')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const { body } = req
  const { username, password } = body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    res.status(401).json({
      error: 'invalid user or password'
    })
  }
})

module.exports = loginRouter
