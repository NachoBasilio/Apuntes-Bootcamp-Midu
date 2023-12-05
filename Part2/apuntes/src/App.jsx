import { useState } from "react"
import Note from "./components/Note"
const initialNotes = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
]


const App = () => {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [title, setTitle] = useState("")

  const handleChangeText = (e) => {
    setNewNote(e.target.value)
  }
  const handleChangeImp = (e) => {
    setTitle(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        body: newNote,

      },
    ]);
    // Reinicia el estado del input de la nota y del checkbox
    setNewNote('');
    setTitle('');
  };

  return (
    <div>
      <h1>Notes</h1>
      <ol>
        {
          notes.map(note => 
            ( 
            <Note key={note.id} {...note}></Note> 
            )
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
          id="titulo" 
          type="text" 
          onChange={handleChangeImp}
          value={title}
          /> 
          <label htmlFor="titulo">¿Cual es el titulo?</label>
          <button>Create Note</button>
        </form>
    </div>
  )
}

export default App