import PropTypes from 'prop-types';

const Mensaje = ({ mensaje }) => {
    return <h1>{mensaje}</h1>;
}

Mensaje.propTypes = {
    mensaje: PropTypes.string.isRequired // Por ejemplo, aquí se asume que 'mensaje' es una cadena (string) y es requerido
};

export default Mensaje;
