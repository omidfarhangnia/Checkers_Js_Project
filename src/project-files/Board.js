import { useContext, useState } from "react";
import { BoardPartContext } from "../App";

function Piece({ block }) {
  const boardBlocks = useContext(BoardPartContext);

  function handleMakeActive() {
    let newObj = boardBlocks.pieces;
    let PieceKeys = Object.keys(boardBlocks.pieces);
    // after each click i want to have only one active piece
    for (let i = 0; i < PieceKeys.length; i++) {
      newObj[PieceKeys[i]].isActive = false;
    }
    newObj[block.num].isActive = true;

    boardBlocks.setPieces({ ...newObj });
    boardBlocks.setActivePiece(block.num);
    // showLegalMove();
  }

  // function showLegalMove() {}

  return (
    <div className={`block block--${block.color}`}>
      <span style={{ position: "absolute", top: "0", left: "0" }}>
        {block.num}
      </span>
      {block.color === "black" &&
      block.isFilled === false &&
      (block.num === boardBlocks.activePiece - 7 ||
        block.num === boardBlocks.activePiece - 9 ||
        block.num === boardBlocks.activePiece + 7 ||
        block.num === boardBlocks.activePiece + 9) ? (
        <span className="legal--move"></span>
      ) : (
        ""
      )}
      {block.isFilled && (
        <span
          onClick={handleMakeActive}
          className={`pieces piece--${boardBlocks.pieces[block.num].color} ${
            boardBlocks.pieces[block.num].isActive === true
              ? "piece--active"
              : ""
          }`}
        ></span>
      )}
    </div>
  );
}

export default function Board() {
  const boardBlocks = useContext(BoardPartContext);

  return (
    <div className={"board"}>
      {boardBlocks.blocks.map((block, index) => {
        return <Piece key={index} block={block} />;
      })}
    </div>
  );
}
