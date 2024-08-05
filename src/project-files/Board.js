import { useContext } from "react";
import { BoardPartContext } from "../App";

const redKingBlocks = new Set([57, 59, 61, 63]);
const blackKingBlocks = new Set([2, 4, 6, 8]);

function ShowLegalMove({ block, handleMovePiece, handleRemovePiece }) {
  const boardContext = useContext(BoardPartContext);
  let content = "";

  if (block.color === "black") {
    if (boardContext.pieces[boardContext.activePiece] !== undefined) {
      if (block.isFilled === false) {
        if (boardContext.pieces[boardContext.activePiece].isKing === true) {
          if (
            block.num === boardContext.activePiece - 7 ||
            block.num === boardContext.activePiece - 9 ||
            block.num === boardContext.activePiece + 7 ||
            block.num === boardContext.activePiece + 9
          ) {
            content = (
              <span className="legal--move" onClick={handleMovePiece}></span>
            );
          }
        } else if (
          boardContext.pieces[boardContext.activePiece].isKing === false
        ) {
          if (boardContext.pieces[boardContext.activePiece].color === "red") {
            if (
              block.num === boardContext.activePiece + 7 ||
              block.num === boardContext.activePiece + 9
            ) {
              content = (
                <span className="legal--move" onClick={handleMovePiece}></span>
              );
            }
          } else if (
            boardContext.pieces[boardContext.activePiece].color === "black"
          ) {
            if (
              block.num === boardContext.activePiece - 7 ||
              block.num === boardContext.activePiece - 9
            ) {
              content = (
                <span className="legal--move" onClick={handleMovePiece}></span>
              );
            }
          }
        }
      } else if (block.isFilled === true) {
        if (
          boardContext.pieces[block.num].color ===
          boardContext.pieces[boardContext.activePiece].color
        )
          return;
        if (boardContext.pieces[boardContext.activePiece].isKing === true) {
          if (
            boardContext.blocks[boardContext.activePiece + 14 - 1] !==
              undefined &&
            block.num === boardContext.activePiece + 7 &&
            boardContext.blocks[boardContext.activePiece + 14 - 1].isFilled ===
              false
          ) {
            content = (
              <span
                className="legal--move kick--enemy"
                onClick={handleRemovePiece}
              ></span>
            );
          }

          if (
            boardContext.blocks[boardContext.activePiece + 18 - 1] !==
              undefined &&
            block.num === boardContext.activePiece + 9 &&
            boardContext.blocks[boardContext.activePiece + 18 - 1].isFilled ===
              false
          ) {
            content = (
              <span
                className="legal--move kick--enemy"
                onClick={handleRemovePiece}
              ></span>
            );
          }

          if (
            boardContext.blocks[boardContext.activePiece - 18 - 1] !==
              undefined &&
            block.num === boardContext.activePiece - 9 &&
            boardContext.blocks[boardContext.activePiece - 18 - 1].isFilled ===
              false
          ) {
            content = (
              <span
                className="legal--move kick--enemy"
                onClick={handleRemovePiece}
              ></span>
            );
          }

          if (
            boardContext.blocks[boardContext.activePiece - 14 - 1] !==
              undefined &&
            block.num === boardContext.activePiece - 7 &&
            boardContext.blocks[boardContext.activePiece - 14 - 1].isFilled ===
              false
          ) {
            content = (
              <span
                className="legal--move kick--enemy"
                onClick={handleRemovePiece}
              ></span>
            );
          }
        } else if (
          boardContext.pieces[boardContext.activePiece].isKing === false
        ) {
          if (boardContext.pieces[boardContext.activePiece].color === "red") {
            if (
              boardContext.blocks[boardContext.activePiece + 14 - 1] !==
                undefined &&
              boardContext.blocks[boardContext.activePiece + 14 - 1].color !==
                "white"
            ) {
              if (
                block.num === boardContext.activePiece + 7 &&
                boardContext.blocks[boardContext.activePiece + 14 - 1]
                  .isFilled === false
              ) {
                content = (
                  <span
                    className="legal--move kick--enemy"
                    onClick={handleRemovePiece}
                  ></span>
                );
              }
            }

            if (
              boardContext.blocks[boardContext.activePiece + 18 - 1] !==
                undefined &&
              boardContext.blocks[boardContext.activePiece + 18 - 1].color !==
                "white"
            ) {
              if (
                block.num === boardContext.activePiece + 9 &&
                boardContext.blocks[boardContext.activePiece + 18 - 1]
                  .isFilled === false
              ) {
                content = (
                  <span
                    className="legal--move kick--enemy"
                    onClick={handleRemovePiece}
                  ></span>
                );
              }
            }
          } else if (
            boardContext.pieces[boardContext.activePiece].color === "black"
          ) {
            if (
              boardContext.blocks[boardContext.activePiece - 14 - 1] !==
                undefined &&
              boardContext.blocks[boardContext.activePiece - 14 - 1].color !==
                "white"
            ) {
              if (
                block.num === boardContext.activePiece - 7 &&
                boardContext.blocks[boardContext.activePiece - 14 - 1]
                  .isFilled === false
              ) {
                content = (
                  <span
                    className="legal--move kick--enemy"
                    onClick={handleRemovePiece}
                  ></span>
                );
              }
            }

            if (
              boardContext.blocks[boardContext.activePiece - 18 - 1] !==
                undefined &&
              boardContext.blocks[boardContext.activePiece - 18 - 1].color !==
                "white"
            ) {
              if (
                block.num === boardContext.activePiece - 9 &&
                boardContext.blocks[boardContext.activePiece - 18 - 1]
                  .isFilled === false
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
  }

  return content;
}

function Piece({ block }) {
  const boardContext = useContext(BoardPartContext);

  function handleMakeActive() {
    // only player who his turn is should play
    if (boardContext.playerTurn !== boardContext.pieces[block.num].color)
      return;

    let newObj = boardContext.pieces;
    let PieceKeys = Object.keys(boardContext.pieces);
    // after each click i want to have only one active piece
    for (let i = 0; i < PieceKeys.length; i++) {
      newObj[PieceKeys[i]].isActive = false;
    }
    newObj[block.num].isActive = true;

    boardContext.setPieces({ ...newObj });
    boardContext.setActivePiece(block.num);
  }

  function giveKingValue(pieceColor) {
    let kingValue = false;

    if (
      (pieceColor === "red" && redKingBlocks.has(block.num)) ||
      (pieceColor === "black" && blackKingBlocks.has(block.num))
    ) {
      kingValue = true;
    }

    return kingValue;
  }

  function handleMovePiece() {
    // making a new blocks array
    let newPieceObj = boardContext.pieces;
    let kingValue = boardContext.pieces[boardContext.activePiece].isKing
      ? true
      : giveKingValue(boardContext.playerTurn);

    newPieceObj[block.num] = {
      ...newPieceObj[boardContext.activePiece],
      isKing: kingValue,
      isActive: false,
    };
    delete newPieceObj[boardContext.activePiece];
    boardContext.setPieces({ ...newPieceObj });
    // making a new pieces object
    let newBlockArray = boardContext.blocks;
    newBlockArray[boardContext.activePiece - 1].isFilled = false;
    newBlockArray[block.num - 1].isFilled = true;
    boardContext.setBlocks([...newBlockArray]);
    // now there is no selected piece
    boardContext.setActivePiece("");
    // change turn
    boardContext.setPlayerTurn(
      boardContext.playerTurn === "red" ? "black" : "red"
    );
  }

  function handleCheckWinner() {
    const piecesNumber = {
      red: { number: 0, kings: 0 },
      black: { number: 0, kings: 0 },
    };
    const piecesValues = Object.values(boardContext.pieces);

    for (var i = 0; i < piecesValues.length; i++) {
      if (piecesValues[i].color === "black") {
        piecesNumber.black.number++;
        if (piecesValues[i].isKing) piecesNumber.black.kings++;
      } else {
        piecesNumber.red.number++;
        if (piecesValues[i].isKing) piecesNumber.red.kings++;
      }
    }

    if (piecesNumber.red.number === 0) {
      boardContext.setWinner({
        name: "black",
        RemianedKingsNumber: piecesNumber.black.kings,
        RemainedPiecesNumber: piecesNumber.black.number,
      });
    } else if (piecesNumber.black.number === 0) {
      boardContext.setWinner({
        name: "red",
        RemianedKingsNumber: piecesNumber.red.kings,
        RemainedPiecesNumber: piecesNumber.red.number,
      });
    }
  }

  function handleRemovePiece() {
    let newBlockNum = 0;
    newBlockNum =
      boardContext.activePiece - 2 * (boardContext.activePiece - block.num);
    // making a new pieces array
    let newPieceObj = boardContext.pieces;
    newPieceObj[newBlockNum] = {
      ...newPieceObj[boardContext.activePiece],
      isActive: false,
    };
    delete newPieceObj[boardContext.activePiece];
    delete newPieceObj[block.num];
    boardContext.setPieces({ ...newPieceObj });

    // making a new blocks object
    let newBlockArray = boardContext.blocks;
    newBlockArray[boardContext.activePiece - 1].isFilled = false;
    newBlockArray[block.num - 1].isFilled = false;
    newBlockArray[newBlockNum - 1].isFilled = true;
    boardContext.setBlocks([...newBlockArray]);
    // now there is no selected piece
    boardContext.setActivePiece("");
    // change turn
    boardContext.setPlayerTurn(
      boardContext.playerTurn === "red" ? "black" : "red"
    );

    handleCheckWinner();
  }

  return (
    <div className={`block block--${block.color}`}>
      <ShowLegalMove
        block={block}
        handleMovePiece={handleMovePiece}
        handleRemovePiece={handleRemovePiece}
      />

      {block.isFilled && (
        <span
          onClick={handleMakeActive}
          className={`pieces piece--${boardContext.pieces[block.num].color} ${
            boardContext.pieces[block.num].isActive === true
              ? "piece--active"
              : ""
          }`}
        ></span>
      )}
    </div>
  );
}

export default function Board() {
  const boardContext = useContext(BoardPartContext);

  return (
    <div className={"board"}>
      {boardContext.blocks.map((block, index) => {
        return <Piece key={index} block={block} />;
      })}
    </div>
  );
}
