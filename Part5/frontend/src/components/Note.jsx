import PropTypes from 'prop-types';


export default function Note({title, body}) {
  return (
    <div>

        <h3>{title}</h3>
        <p>{body}</p>
    </div>
  )
}


Note.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,

}