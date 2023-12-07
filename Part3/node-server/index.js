const express = require('express')
const app = express()

app.use(express.json())
let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2019-05-30T18:39:34.091Z',
		importan: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	}
]

// const app = http.createServer((request, response) =>{
//     response.writeHead(200,{'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
	response.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = request.params.id

	const note = notes.find(note => note.id === parseInt(id))
    
	if(note){
		response.json(note)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/notes/:id', (request, response) => {
	const id = request.params.id
	notes = notes.filter(note => note.id !== parseInt(id))

	response.status(204).end()
})

app.post('/api/notes', (request, response) => {
	const note = request.body
	if(note.important === 'true'){
		note.important = true
	}else{
		note.important =false
	}

	const ids = notes.map(note => note.id)
	const maxId = Math.max(...ids)

	//Lo del length no es la mejor opción
	const newNote = {
		id: maxId +1,
		date: new Date().toISOString(),
		content: note.content,
		important: note.important 
	}

	notes = [...notes, newNote]

	response.status(201).json(notes)
})

const PORT = 3001

app.listen(PORT, () => {
	console.log(`Server corriendo en el puerto ${PORT}`)
})
