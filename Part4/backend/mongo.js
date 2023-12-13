const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://admin:admin@notasmidu.ry7llh7.mongodb.net/appNotas?retryWrites=true&w=majority'

// coneccion a mongoDB

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })
