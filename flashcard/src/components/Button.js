import PropTypes from "prop-types";

export default function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
      {props.text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.node,
};
