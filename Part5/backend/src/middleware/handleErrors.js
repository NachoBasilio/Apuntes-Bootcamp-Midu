module.exports = (error, request, response, next) => {
  console.log(error.name, 'error')

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'id used is bad' })
  }
  response.status(500).send({ error: 'Generic' })
}
