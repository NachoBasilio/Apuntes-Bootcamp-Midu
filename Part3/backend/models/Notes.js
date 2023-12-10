const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: String,
  date: Date,
  important: String,
  body: String
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note

// const note = new Note({
//   title: 'Aguanten los pokemon',
//   important: true,
//   body: 'Los pokemon son lo mas',
//   date: new Date()
// })

// Vamos a ver que tiene adentro
// Note.find({}).then(results => {
//   console.log(results)
//   mongoose.connection.close()
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(error => {
//     console.error(error)
//   })
