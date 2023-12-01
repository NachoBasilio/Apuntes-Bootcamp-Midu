import PropTypes from 'prop-types';


export default function Header({course}) {
  return (
    <>
        <h1>{course}</h1>
    </>
  )
}

Header.propTypes = {
    course: PropTypes.string.isRequired
}

