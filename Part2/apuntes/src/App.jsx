import { useState } from "react"
import Note from "./components/Note"
const initialNotes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]


const App = () => {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [important, setImportant] = useState(false)
  const [filter, setFilter] = useState(true)

  const handleChangeText = (e) => {
    setNewNote(e.target.value)
  }
  const handleChangeImp = (e) => {
    setImportant(e.target.checked)
  }
  const handlerFilter = () =>{
    setFilter(prevValue => !prevValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fecha = new Date();
    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        date: fecha.toISOString(),
        content: newNote,
        important: important,
      },
    ]);
    // Reinicia el estado del input de la nota y del checkbox
    setNewNote('');
    setImportant(false);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button
      onClick={handlerFilter}
      >Muestra todos</button>
      <ol>
        {
          filter ?
          notes.map(note => 
            (note.important ? 
            <Note key={note.id} {...note}></Note> :
            ""
            )
          ) :
          notes.map(note => 
            <Note key={note.id} {...note}></Note> 
          )
        }
      </ol>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
          <input 
          type="text" 
          onChange={handleChangeText}
          value={newNote}
          />
          <input 
          id="Checkbox" 
          type="checkbox" 
          onChange={handleChangeImp}
          checked={important}
          /> 
          <label htmlFor="Checkbox">¿Es importante?</label>
          <button>Create Note</button>
        </form>
    </div>
  )
}

export default App