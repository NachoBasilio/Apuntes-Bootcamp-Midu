import PropTypes from 'prop-types';


export default function Part({part, exercises}) {
  return (
    <p>
    {part} {exercises}
    </p>
  )
}


Part.propTypes = {
    part: PropTypes.string.isRequired,
    exercises: PropTypes.string.isRequired,

}