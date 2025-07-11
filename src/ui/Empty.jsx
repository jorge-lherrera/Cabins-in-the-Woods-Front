import PropTypes from "prop-types";

function Empty({ resourceName }) {
  return <p>Nenhum(a) {resourceName} foi encontrado(a).</p>;
}

Empty.propTypes = {
  resourceName: PropTypes.string.isRequired,
};

export default Empty;
