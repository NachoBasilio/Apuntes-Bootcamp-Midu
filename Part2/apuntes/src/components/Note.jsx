import PropTypes from 'prop-types';


export default function Note({note}) {
  return (
    <div className={note.important ? "red" : "green"}>
        <h3>{note.content}</h3>
        <time>{note.date}</time>
    </div>
  )
}


Note.propTypes = {
    note: PropTypes.object.isRequired
}