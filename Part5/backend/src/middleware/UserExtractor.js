const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')

  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
    // Resto del código
  } catch (error) {
    console.log(error)
    return response.status(401).json({
      error: 'Token inválido o no proporcionado'
    })
  }

  // Vamos a recuperar al usuario
  const { id: userId } = decodedToken
  request.userId = userId
  next()
}
