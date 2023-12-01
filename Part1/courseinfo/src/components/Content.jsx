import PropTypes from 'prop-types';
import Part from './Part';


export default function Content({contenido}) {
  return (
    <div>
        {
            contenido.map(cont => <Part key={cont.part} part={cont.part} exercises={cont.exercises}/>)
        }
    </div>
  )
}

Content.propTypes = {
    contenido: PropTypes.array.isRequired,
}