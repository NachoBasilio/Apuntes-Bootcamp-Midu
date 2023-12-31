const bcrypt = require('bcrypt')
const User = require('../models/User')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  const { body } = req
  const { username, password } = body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: 'invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
    name: user.name
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
