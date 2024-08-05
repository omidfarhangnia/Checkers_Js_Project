export default function Page({ children }) {
  return (
    <div className="container">
      <div className="container--setBlur">{children}</div>;
    </div>
  );
}

export function ShowWinner({
  winnerName,
  RemainedPiecesNumber,
  RemianedKingsNumber,
}) {
  return (
    <div className="winnerContainer">
      <h1 className="winnerContainer--header">winner winner chicken dinner</h1>
      <h3 className="winnerContainer--winnerName">
        <span className={`${winnerName}--winner winner--name`}>
          {winnerName}
        </span>{" "}
        is our winnner!!
      </h3>
      <p className="winnerContainer--data">
        <span>{RemainedPiecesNumber}</span>{" "}
        {RemainedPiecesNumber > 1 ? "pieces have" : "piece has"} survived
      </p>
      <p className="winnerContainer--data">
        <span>{RemianedKingsNumber}</span>{" "}
        {RemianedKingsNumber > 1
          ? "kings which have made have"
          : "king which has made has"}{" "}
        remained
      </p>
    </div>
  );
}
