import PropTypes from "prop-types";

export default function FaStar({ icon, className, id, onClick }) {
  return (
    <img
      className={className}
      src={icon}
      alt=""
      srcSet=""
      onClick={onClick}
      id={id}
    />
  );
}

FaStar.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
