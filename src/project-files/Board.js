import { useContext } from "react";
import { BoardPartContext } from "../App";

function ShowLegalMove({ block, handleMovePiece, handleRemovePiece }) {
  const boardBlocks = useContext(BoardPartContext);
  let content = "";

  if (block.color === "black") {
    if (boardBlocks.pieces[boardBlocks.activePiece] !== undefined) {
      if (block.isFilled === false) {
        if (boardBlocks.pieces[boardBlocks.activePiece].isKing === true) {
          if (
            block.num === boardBlocks.activePiece - 7 ||
            block.num === boardBlocks.activePiece - 9 ||
            block.num === boardBlocks.activePiece + 7 ||
            block.num === boardBlocks.activePiece + 9
          ) {
            content = (
              <span className="legal--move" onClick={handleMovePiece}></span>
            );
          }
        } else if (
          boardBlocks.pieces[boardBlocks.activePiece].isKing === false
        ) {
          if (boardBlocks.pieces[boardBlocks.activePiece].color === "red") {
            if (
              block.num === boardBlocks.activePiece + 7 ||
              block.num === boardBlocks.activePiece + 9
            ) {
              content = (
                <span className="legal--move" onClick={handleMovePiece}></span>
              );
            }
          } else if (
            boardBlocks.pieces[boardBlocks.activePiece].color === "black"
          ) {
            if (
              block.num === boardBlocks.activePiece - 7 ||
              block.num === boardBlocks.activePiece - 9
            ) {
              content = (
                <span className="legal--move" onClick={handleMovePiece}></span>
              );
            }
          }
        }
      } else if (block.isFilled === true) {
        if (
          boardBlocks.pieces[block.num].color ===
          boardBlocks.pieces[boardBlocks.activePiece].color
        )
          return;

        if (boardBlocks.pieces[boardBlocks.activePiece].isKing === true) {
          if (
            (block.num === boardBlocks.activePiece + 7 &&
              boardBlocks.blocks[boardBlocks.activePiece + 14 - 1].isFilled ===
                false) ||
            (block.num === boardBlocks.activePiece + 9 &&
              boardBlocks.blocks[boardBlocks.activePiece + 18 - 1].isFilled ===
                false) ||
            (block.num === boardBlocks.activePiece - 7 &&
              boardBlocks.blocks[boardBlocks.activePiece - 14 - 1].isFilled ===
                false) ||
            (block.num === boardBlocks.activePiece - 9 &&
              boardBlocks.blocks[boardBlocks.activePiece - 18 - 1].isFilled ===
                false)
          ) {
            content = (
              <span
                className="legal--move kick--enemy"
                onClick={handleRemovePiece}
              ></span>
            );
          }
        } else if (
          boardBlocks.pieces[boardBlocks.activePiece].isKing === false
        ) {
          if (boardBlocks.pieces[boardBlocks.activePiece].color === "red") {
            if (
              boardBlocks.blocks[boardBlocks.activePiece + 14 - 1].color ===
                "white" ||
              boardBlocks.blocks[boardBlocks.activePiece + 18 - 1].color ===
                "white"
            )
              return;

            if (
              (block.num === boardBlocks.activePiece + 7 &&
                boardBlocks.blocks[boardBlocks.activePiece + 14 - 1]
                  .isFilled === false) ||
              (block.num === boardBlocks.activePiece + 9 &&
                boardBlocks.blocks[boardBlocks.activePiece + 18 - 1]
                  .isFilled === false)
            ) {
              content = (
                <span
                  className="legal--move kick--enemy"
                  onClick={handleRemovePiece}
                ></span>
              );
            }
          } else if (
            boardBlocks.pieces[boardBlocks.activePiece].color === "black"
          ) {
            if (
              boardBlocks.blocks[boardBlocks.activePiece - 14 - 1].color ===
                "white" ||
              boardBlocks.blocks[boardBlocks.activePiece - 18 - 1].color ===
                "white"
            )
              return;

            if (
              (block.num === boardBlocks.activePiece - 7 &&
                boardBlocks.blocks[boardBlocks.activePiece - 14 - 1]
                  .isFilled === false) ||
              (block.num === boardBlocks.activePiece - 9 &&
                boardBlocks.blocks[boardBlocks.activePiece - 18 - 1]
                  .isFilled === false)
            ) {
              content = (
                <span
                  className="legal--move kick--enemy"
                  onClick={handleRemovePiece}
                ></span>
              );
            }
          }
        }
      }
    }
  }

  return content;
}

function Piece({ block }) {
  const boardBlocks = useContext(BoardPartContext);

  function handleMakeActive() {
    // only player who his turn is should play
    if (boardBlocks.playerTurn !== boardBlocks.pieces[block.num].color) return;

    let newObj = boardBlocks.pieces;
    let PieceKeys = Object.keys(boardBlocks.pieces);
    // after each click i want to have only one active piece
    for (let i = 0; i < PieceKeys.length; i++) {
      newObj[PieceKeys[i]].isActive = false;
    }
    newObj[block.num].isActive = true;

    boardBlocks.setPieces({ ...newObj });
    boardBlocks.setActivePiece(block.num);
  }

  function handleMovePiece() {
    // making a new blocks array
    let newPieceObj = boardBlocks.pieces;
    newPieceObj[block.num] = {
      ...newPieceObj[boardBlocks.activePiece],
      isActive: false,
    };
    delete newPieceObj[boardBlocks.activePiece];
    boardBlocks.setPieces({ ...newPieceObj });
    // making a new pieces object
    let newBlockArray = boardBlocks.blocks;
    newBlockArray[boardBlocks.activePiece - 1].isFilled = false;
    newBlockArray[block.num - 1].isFilled = true;
    boardBlocks.setBlocks([...newBlockArray]);
    // now there is no selected piece
    boardBlocks.setActivePiece("");
    // change turn
    boardBlocks.setPlayerTurn(
      boardBlocks.playerTurn === "red" ? "black" : "red"
    );
  }

  function handleRemovePiece() {
    let newBlockNum = 0;
    if(boardBlocks.playerTurn === "red") {
      newBlockNum = boardBlocks.activePiece + (2 * Math.abs(boardBlocks.activePiece - block.num));
    }else {
      newBlockNum = boardBlocks.activePiece - (2 * Math.abs(boardBlocks.activePiece - block.num));
    }

    // making a new blocks array
    let newPieceObj = boardBlocks.pieces;
    newPieceObj[newBlockNum] = {
      ...newPieceObj[boardBlocks.activePiece],
      isActive: false,
    };
    delete newPieceObj[boardBlocks.activePiece];
    delete newPieceObj[block.num];
    boardBlocks.setPieces({ ...newPieceObj });

    // making a new pieces object
    let newBlockArray = boardBlocks.blocks;
    newBlockArray[boardBlocks.activePiece - 1].isFilled = false;
    newBlockArray[block.num - 1].isFilled = false;
    newBlockArray[newBlockNum - 1].isFilled = true;
    boardBlocks.setBlocks([...newBlockArray]);
    // now there is no selected piece
    boardBlocks.setActivePiece("");
    // change turn
    boardBlocks.setPlayerTurn(
      boardBlocks.playerTurn === "red" ? "black" : "red"
    );
  }

  return (
    <div className={`block block--${block.color}`}>
      <span style={{ position: "absolute", top: "0", left: "0" }}>
        {block.num}
      </span>

      <ShowLegalMove
        block={block}
        handleMovePiece={handleMovePiece}
        handleRemovePiece={handleRemovePiece}
      />

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
