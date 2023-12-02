import { useState } from 'react'
import './App.css'



function App() {
  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)
  const [counters, setCounters] = useState({
    left: 0,
    right: 0
  })


  const handlerClick = (lado) =>{
    if(lado === "left"){
      setCounters({
        ...counters,
        left: counters.left + 1
      })
    }else{
      setCounters({
        ...counters,
        right: counters.right + 1
      })
    }
  }

  return (
    <>
    <h1>Estado complejo | React y useState</h1>

      {counters.left}
      <button
        onClick={()=>{handlerClick("left")}}
      >
        left
      </button>

      <button
        onClick={()=>{handlerClick("right")}}
      >
        right
      </button>
      {counters.right}

    </>
  )
}

export default App
