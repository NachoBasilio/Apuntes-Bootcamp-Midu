import { useEffect, useState } from "react"
import Note from "./components/Note"

import getAllNotes from "./hellpers/getAllNotes"
import createNote from "./hellpers/createNote"



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, []); // Dejar el array de dependencias vacío
  
  


  const handleChangeText = (e) => {
    setNewNote(e.target.value)
  }
  const handleChangeImp = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const noteToAddToState = {
      title: title,
      body: newNote,
      important: "true",
    };
  
    createNote(noteToAddToState)
      .then(() => {
        // Actualizar el estado aquí sin realizar una nueva llamada a getAllNotes
        setNotes((prevNotes) => [...prevNotes, noteToAddToState]);
        setNewNote("");
        setTitle("");
      })
      .catch((error) => {
        console.error("Error al crear la nota:", error);
      });
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