import PropTypes from "prop-types";
import Button from "./Button";
import FaStar from "./FaStar";
import fa_star from "../images/fa-star.png";
import fb_star from "../images/fb-star.png";

export default function Card({
  id,
  idx,
  handleStarClick,
  word,
  part_of_speech,
  definition,
  handleExampleClick,
  vocabStates,
  children,
}) {
  // const outit = () => {
  //   let el = document.createElement("html");
  //   fetch(`https://dictionary.cambridge.org/pronunciation/english/peculiar`)
  //     .then((resp) => resp.body)
  //     .then((stream) =>
  //       new Response(stream, {
  //         headers: { "Content-Type": "text/html" },
  //       }).text()
  //     )
  //     .then((g) => {
  //       el.innerHTML = g;
  //       let zz = [...el.getElementsByTagName("meta")]
  //         .map((i) => i.content)
  //         .filter(
  //           (i) =>
  //             i.endsWith("mp3") &&
  //             i.startsWith("https") &&
  //             i.includes("us_pron")
  //         );
  //       return zz;
  //     })
  //     .then((zz) => console.log(zz));
  // };
  console.assert(id !== undefined); // SO sad...
  console.assert(idx !== undefined); // SO sad...
  const basicPos = ["Noun", "Adjective", "Verb", "Adverb"];
  return (
    <>
      <div className="vocabulary">
        <Button className={["icon-button", "button"].join(" ")}>
          <FaStar
            icon={
              // vocabStates["star_states"][`star-${id}`] ? fb_star : fa_star
              vocabStates["star_states"][`star-${word}`] ? fb_star : fa_star
            }
            className="fa-star"
            id={
              // `star-${id}`
              `star-${word}`
            }
            onClick={handleStarClick}
          />
        </Button>
        <h2 className="word">{word}</h2>
        <h4
          className={`pos${
            basicPos.includes(part_of_speech) ? "-" + part_of_speech : ""
          }`}
        >
          {part_of_speech}
        </h4>
        {/* <h5 onClick={outit}>hi</h5> */}
      </div>
      <h3 className="definition">{definition}</h3>
      <Button
        className={["example-button", "button"].join(" ")}
        text={"Example"}
        onClick={handleExampleClick}
      />
      {
        // TODO: TOAsk? Magic???
        // https://stackoverflow.com/questions/36651583/dynamically-add-child-components-in-react
        children
      }
    </>
  );
}

Card.propTypes = {
  id: PropTypes.string,
  idx: PropTypes.number,
  word: PropTypes.string.isRequired,
  part_of_speech: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  handleStarClick: PropTypes.func,
  handleExampleClick: PropTypes.func,
  vocabStates: PropTypes.object,
  children: PropTypes.node,
};
