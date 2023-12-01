import PropTypes from 'prop-types'

export default function Total({total}) {
    const cantidad = total.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises;
    }, 0);
      
  return (
    <div>Number of exercises {cantidad}</div>
  )
}

Total.propTypes = {
    total: PropTypes.array.isRequired
}