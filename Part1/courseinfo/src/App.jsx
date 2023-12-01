import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

const App = () => {
  const name = 'Half Stack application development'
  const contenido = [
  {
    part: 'Fundamentals of React',
    exercises: 10
  },
  {
    part: 'Using props to pass data',
    exercises: 7
  },
  {
    part: 'State of a component',
    exercises: 14
  }
]
  return (
    <div>
      <Header course={name}></Header>
      <Content contenido={contenido}></Content>
      <Total total={contenido}></Total>
    </div>
  )
}

export default App 