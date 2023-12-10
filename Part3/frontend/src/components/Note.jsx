import PropTypes from 'prop-types';


export default function Note({title, body, id}) {
  return (
    <div>
        <h4>
        {id}
        </h4>
        <h3>{title}</h3>
        <p>{body}</p>
    </div>
  )
}


Note.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}