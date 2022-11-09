import PropTypes from "prop-types";
import Card from "./Card";

export default function Content({
  vocabularies,
  handleStarClick,
  handleExampleClick,
  vocabStates,
}) {
  return (
    <div className="content">
      {vocabularies
        .filter(
          (
            item
            // index,
          ) => {
            // console.clear();
            // console.log(item);
            // console.log(index);
            // console.log(vocabStates.star_states);
            // if (vocabStates.star_states[`star-${index}`]) {
            //   console.log(item);
            // }
            // return true;
            if (vocabStates.only_fav)
              return vocabStates.star_states[`star-${item.word}`] ?? false;
            else return true;
          }
        )
        .map((v, i) => (
          <div className="card" key={v.word} id={v.word}>
            {/* 這個 key 很重要！！  // TODO: ID dirty! */}
            <Card
              word={v.word}
              part_of_speech={v.part_of_speech}
              definition={v.definition}
              handleStarClick={handleStarClick}
              handleExampleClick={handleExampleClick}
              id={v.word}
              idx={i}
              vocabStates={vocabStates}
            >
              <div className="example_sentence">
                {
                  // TODO: Really OK???  // {/* bad TODO: fixme children! */}
                  vocabStates["example_states"][v.word] ? (
                    <div>{v.example}</div>
                  ) : null
                }
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
}

Content.propTypes = {
  vocabularies: PropTypes.array.isRequired,
  handleStarClick: PropTypes.func,
  handleExampleClick: PropTypes.func,
  vocabStates: PropTypes.object, // FIXME
};
