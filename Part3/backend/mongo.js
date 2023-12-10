const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://admin:admin@notasmidu.ry7llh7.mongodb.net/notes?retryWrites=true&w=majority'

// coneccion a mongoDB

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

const noteSchema = new mongoose.Schema({
  title: String,
  date: Date,
  important: String,
  body: String
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  title: 'Aguanten los pokemon',
  important: true,
  body: 'Los pokemon son lo mas',
  date: new Date()
})

note.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(error => {
    console.error(error)
  })
