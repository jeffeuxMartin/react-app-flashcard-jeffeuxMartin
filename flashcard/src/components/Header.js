import PropTypes from "prop-types";
import Button from "./Button";
import FaStar from "./FaStar";
import fa_star from "../images/fa-star.png";
import fb_star from "../images/fb-star.png";

export default function Header({ title, onClick, favOn = false }) {
  return (
    <header className="title">
      <div>{title}</div>
      <Button
        className={[
          "button",
          favOn ? "title-icon-button" : "title-icon-button-disabled",
        ].join(" ")}
        text={
          // " 查看" + (favOn ? "全部單字" : "我的最愛") + "\u00A0"
          " View " +
          (favOn ? "\u00A0All \u00A0Words\u00A0" : "My Favorites") +
          "\u00A0"
        }
        onClick={onClick}
      >
        <FaStar
          icon={favOn ? fb_star : fa_star}
          className="fa-star"
          id={"show-fav"}
          onClick={onClick}
        />
      </Button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  favOn: PropTypes.bool,
  onClick: PropTypes.func,
};
