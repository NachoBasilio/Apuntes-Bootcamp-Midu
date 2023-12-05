import { useEffect, useState } from "react"
import Note from "./components/Note"



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => {
      setNotes(json)
      setLoading(false)
    })
  }, [])
  


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
        title: title,
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
          loading ? 
          (<h1>Cargando notas...</h1>):
          notes.map(note => 
            ( 
            <Note key={note.id} {...note}></Note> 
            )
          ) 
        }
      </ol>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
          <label htmlFor="titulo">¿Cual es el titulo?</label>
          <input 
          id="titulo" 
          type="text" 
          onChange={handleChangeImp}
          value={title}
          /> 
          <label htmlFor="titulo">¿Cual es el body?</label>
    
          <input 
          type="text" 
          id="body"
          onChange={handleChangeText}
          value={newNote}
          />

          <button>Create Note</button>
        </form>
    </div>
  )
}

export default App