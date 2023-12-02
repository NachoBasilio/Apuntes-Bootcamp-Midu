import PropTypes from 'prop-types';


export default function Note({important, content, date}) {
  return (
    <div className={important ? "red" : "green"}>
        <h3>{content}</h3>
        <time>{date}</time>
    </div>
  )
}


Note.propTypes = {
    important: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
}